import { router } from "@/server";

const r = router.prefix("/api/v1/test");

// TODO [RM]: validation

r.get("/", ctx => {
    ctx.body = "Hello and welocome to root route!";
});

r.get("/smth/:id", ctx => {
    ctx.body = {
        request: "smth",
        id: ctx.params.id,
    };
});
