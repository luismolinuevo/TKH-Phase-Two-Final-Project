import express from "express"
import prisma from "../db/index.js"

export default function authorRouter(passport){
    const router = express.Router();

router.post("/",passport.authenticate("jwt", {session: false}), async (req, res) => {
    //creates / adds an author
    
    const newAuthor = await prisma.author.create({
        data: {
            name: req.body.author,
            // description: req.body.description,
            userId: req.user.id,
        },
    });
    console.log(newAuthor);

    res.status(201).json({
        success: true
    });
});

//updates author
router.put("/:authorId",passport.authenticate("jwt", {session: false}), async (req, res) => {
    const updateAuthor = await prisma.author.updateMany({
        where: {
            id: parseInt(req.params.authorId),
            userId: req.user.id
        },
        data: {
            name: req.body.author,
            // description: req.body.description
            userId: req.user.id,
        }
    });
    console.log(updateAuthor);
    //sends back response if it works 
    res.status(200).json({
        success: true, 
        message: "author name has been edited."
    });
})

router.get("/", async (req, res) => {
    const allAuthors = await prisma.author.findMany();

    res.status(200).json({
      success: true,
      allAuthors
    })
})

router.get("/:id", async (req, res) => {
    const allAuthors = await prisma.author.findFirst({
        where: {
            id: parseInt(req.params.id)
        },
    });

    res.status(200).json({
      success: true,
      allAuthors
    })
})

return router;
}





