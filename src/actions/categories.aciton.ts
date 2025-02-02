"use server";

import { prisma } from "@root/database";

export const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany({ select: { id: true, name: true }, orderBy: { createdAt: "desc" } });

    return categories;
  } catch (error) {
    console.error(error)
    return [];
  }
};

export const addCategory = async (category: string) => {
  try {
    await prisma.category.createManyAndReturn({
      data: {
        name: category,
      },
    });

    const categories = await prisma.category.findMany({
      select: { id: true, name: true },
      orderBy: { createdAt: "desc" },
    });

    return categories;
  } catch (error) {
    console.error(error)
    return [];
  }
};
