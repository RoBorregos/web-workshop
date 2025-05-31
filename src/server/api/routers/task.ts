import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const taskRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.task.findMany({ orderBy: { createdAt: "desc" } });
  }),
  add: publicProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return ctx.db.task.create({ data: { title: input.title } });
    }),
  toggle: publicProcedure.input(z.string()).mutation(async ({ input, ctx }) => {
    const task = await ctx.db.task.findUnique({ where: { id: input } });
    if (!task) throw new Error("Task not found");
    return ctx.db.task.update({
      where: { id: input },
      data: { completed: !task.completed },
    });
  }),
});