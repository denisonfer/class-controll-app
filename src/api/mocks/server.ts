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

const SCHOOL_SEEDS = [
  { name: "Escola Municipal Santos Dumont", address: "Rua das Flores, 120", classCount: 4 },
  { name: "Colégio Estadual Tiradentes", address: "Av. Brasil, 850", classCount: 3 },
  { name: "EMEF Monteiro Lobato", address: "Rua das Acácias, 45", classCount: 2 },
  { name: "Escola Municipal Cecília Meireles", address: "Praça da República, 10", classCount: 2 },
  { name: "Colégio Dom Pedro II", address: "Rua do Comércio, 300", classCount: 1 },
  { name: "EMEF Paulo Freire", address: "Av. Independência, 2100", classCount: 1 },
  { name: "Escola Estadual Machado de Assis", address: "Rua das Palmeiras, 78", classCount: 1 },
  { name: "Centro Educacional Anísio Teixeira", address: "Rua São João, 512", classCount: 1 },
  { name: "EMEF Cora Coralina", address: "Av. das Nações, 90", classCount: 0 },
  { name: "Escola Municipal Vinicius de Moraes", address: "Rua da Paz, 15", classCount: 0 },
] as const;

const CLASS_NAMES = [
  "1º Ano A",
  "1º Ano B",
  "2º Ano A",
  "3º Ano A",
  "4º Ano B",
  "5º Ano A",
  "6º Ano C",
  "7º Ano A",
  "8º Ano B",
  "9º Ano A",
  "1º Ano C",
  "2º Ano B",
  "3º Ano B",
  "4º Ano A",
  "5º Ano B",
] as const;

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

function byNewestFirst<T extends { id?: string }>(collection: {
  sort: (compare: (a: T, b: T) => number) => unknown;
}) {
  return collection.sort((a, b) => Number(b.id) - Number(a.id));
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
          return SCHOOL_SEEDS[i % SCHOOL_SEEDS.length].name;
        },
        address(i: number) {
          return SCHOOL_SEEDS[i % SCHOOL_SEEDS.length].address;
        },
      }),
      schoolClass: Factory.extend({
        name(i: number) {
          return CLASS_NAMES[i % CLASS_NAMES.length];
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
      SCHOOL_SEEDS.forEach((seed) => {
        const school = server.create("school", {
          name: seed.name,
          address: seed.address,
        });

        if (seed.classCount > 0) {
          server.createList("schoolClass", seed.classCount, { school });
        }
      });
    },

    routes() {
      this.urlPrefix = "http://localhost:3000";
      this.namespace = "api/v1";
      this.timing = 400;
      this.logging = true;

      this.get("/schools", (schema) => {
        return byNewestFirst(schema.all("school"));
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

        //return new Response(500, {}, { message: "Falha simulada" });
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

        return byNewestFirst(school.schoolClasses);
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
