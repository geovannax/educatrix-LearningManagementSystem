import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Cria roles
  const [aluno, professor, admin] = await Promise.all([
    prisma.role.create({ data: { name: "aluno" } }),
    prisma.role.create({ data: { name: "professor" } }),
    prisma.role.create({ data: { name: "admin" } }),
  ]);

  // Cria tipos de atividades
  const [codigo, discursiva, objetiva] = await Promise.all([
    prisma.activityType.create({ data: { type: "codigo" } }),
    prisma.activityType.create({ data: { type: "discursiva" } }),
    prisma.activityType.create({ data: { type: "objetiva" } }),
  ]);

  // Cria usuários
  await prisma.user.createMany({
    data: [
      {
        email: "prof@educatrix.dev",
        password: "123Abc!",
        name: "Professor do Educatrix",
        roleId: professor.id,
      },
      {
        email: "aluno@educatrix.dev",
        password: "123Abc!",
        name: "Aluno Educatrix",
        roleId: aluno.id,
      },
      {
        email: "admin@educatrix.dev",
        password: "123Abc!",
        name: "Admin Educatrix",
        roleId: admin.id,
      },
    ],
  });

  // Cria uma atividade vinculada ao professor
  await prisma.activity.createMany({
    data: [
      {
        title: "Atividade de Lógica",
        typeId: codigo.id,
        description: "Resolva o problema de lógica usando JavaScript.",
        professorId: professor.id,
      },
      {
        title: "Atividade de Lógica",
        typeId: discursiva.id,
        description: "Resolva o problema de lógica usando JavaScript.",
        professorId: professor.id,
      },
      {
        title: "Atividade de Lógica",
        typeId: objetiva.id,
        description: "Resolva o problema de lógica usando JavaScript.",
        professorId: professor.id,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
