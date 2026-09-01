import {
  Factory,
  Model,
  Response,
  Serializer,
  belongsTo,
  createServer,
  hasMany,
} from "miragejs";

import type {
  TCreateClassPayload,
  TUpdateClassPayload,
} from "@/domains/classes/classes-types";
import type {
  TCreateSchoolPayload,
  TUpdateSchoolPayload,
} from "@/domains/school/school-types";

import { serializeClass, serializeSchool } from "./serializers";

const CLASS_SHIFTS = ["morning", "afternoon", "evening"] as const;

function isCollection<T>(resource: unknown): resource is { models: T[] } {
  return (
    typeof resource === "object" &&
    resource !== null &&
    "models" in resource &&
    Array.isArray(resource.models)
  );
}

function serializeResource<T>(
  resource: unknown,
  serializeOne: (model: T) => unknown,
) {
  if (isCollection<T>(resource)) {
    return resource.models.map(serializeOne);
  }

  return serializeOne(resource as T);
}

const globalRef = globalThis as typeof globalThis & {
  __MIRAGE_SERVER__?: ReturnType<typeof createServer>;
};

export function makeServer() {
  if (globalRef.__MIRAGE_SERVER__) {
    return globalRef.__MIRAGE_SERVER__;
  }

  const server = createServer({
    models: {
      school: Model.extend({
        schoolClasses: hasMany("schoolClass"),
      }),
      schoolClass: Model.extend({
        school: belongsTo("school"),
      }),
    },

    factories: {
      school: Factory.extend({
        name(i: number) {
          return `Escola Municipal ${i + 1}`;
        },
        address(i: number) {
          return `Rua das Flores, ${100 + i}`;
        },
      }),
      schoolClass: Factory.extend({
        name(i: number) {
          return `${(i % 3) + 1}º Ano`;
        },
        shift(i: number) {
          return CLASS_SHIFTS[i % CLASS_SHIFTS.length];
        },
        year: 2026,
      }),
    },

    serializers: {
      school: Serializer.extend({
        serialize(resource) {
          return serializeResource(resource, serializeSchool);
        },
      }),
      schoolClass: Serializer.extend({
        serialize(resource) {
          return serializeResource(resource, serializeClass);
        },
      }),
    },

    seeds(server) {
      const schools = server.createList("school", 3);

      schools.forEach((school) => {
        server.createList("schoolClass", 2, { school });
      });
    },

    routes() {
      this.urlPrefix = "http://localhost:3000";
      this.namespace = "api/v1";
      this.timing = 400;
      this.logging = true;

      this.get("/schools", (schema) => {
        return schema.all("school");
        //return new Response(500, {}, { message: "Falha simulada" });
      });

      this.get("/schools/:id", (schema, request) => {
        const school = schema.find("school", request.params.id);

        if (!school) {
          return new Response(404, {}, { message: "Escola não encontrada" });
        }

        return school;
      });

      this.post("/schools", (schema, request) => {
        const body = JSON.parse(request.requestBody) as TCreateSchoolPayload;

        return schema.create("school", {
          name: body.school_name,
          address: body.school_address,
        });
      });

      this.put("/schools/:id", (schema, request) => {
        const school = schema.find("school", request.params.id);

        if (!school) {
          return new Response(404, {}, { message: "Escola não encontrada" });
        }

        const body = JSON.parse(request.requestBody) as TUpdateSchoolPayload;
        school.update({
          name: body.school_name,
          address: body.school_address,
        });

        return school;
      });

      this.del("/schools/:id", (schema, request) => {
        const school = schema.find("school", request.params.id);

        if (!school) {
          return new Response(404, {}, { message: "Escola não encontrada" });
        }

        school.schoolClasses.destroy();
        school.destroy();

        return new Response(204);
      });

      this.get("/classes", (schema, request) => {
        const rawSchoolId = request.queryParams.school_id;
        const schoolId = Array.isArray(rawSchoolId)
          ? rawSchoolId[0]
          : rawSchoolId;

        if (!schoolId) {
          return schema.none("schoolClass");
        }

        const school = schema.find("school", schoolId);

        if (!school) {
          return schema.none("schoolClass");
        }

        return school.schoolClasses;
      });

      this.post("/classes", (schema, request) => {
        const body = JSON.parse(request.requestBody) as TCreateClassPayload;
        const school = schema.find("school", body.school_id);

        if (!school) {
          return new Response(404, {}, { message: "Escola não encontrada" });
        }

        return schema.create("schoolClass", {
          name: body.class_name,
          shift: body.class_shift,
          year: body.class_year,
          school,
        });
      });

      this.put("/classes/:id", (schema, request) => {
        const schoolClass = schema.find("schoolClass", request.params.id);

        if (!schoolClass) {
          return new Response(404, {}, { message: "Turma não encontrada" });
        }

        const body = JSON.parse(request.requestBody) as TUpdateClassPayload;
        schoolClass.update({
          name: body.class_name,
          shift: body.class_shift,
          year: body.class_year,
        });

        return schoolClass;
      });

      this.del("/classes/:id", (schema, request) => {
        const schoolClass = schema.find("schoolClass", request.params.id);

        if (!schoolClass) {
          return new Response(404, {}, { message: "Turma não encontrada" });
        }

        schoolClass.destroy();

        return new Response(204);
      });

      this.passthrough();
    },
  });

  globalRef.__MIRAGE_SERVER__ = server;

  return server;
}
