import { Comment } from "../entitites/comment.entity";
import { IsNull } from "typeorm";
import { Request, Response } from "express";

export class CommentController {
  private constructor() {}

  static async saveComment(req: Request, res: Response) {
    try {
      const newComment = req.body;
      const comment = new Comment();

      if (
        !newComment.ip ||
        !newComment.name ||
        !newComment.title ||
        !newComment.content
      ) {
        return res.status(400).send({ message: "All information is required" });
      }

      comment.ip = newComment.ip;
      comment.name = newComment.name;
      comment.title = newComment.title;
      comment.content = newComment.content;

      await comment.save();

      return res.status(200).send({ message: "Comment saved" });
    } catch (error: any) {
      return res
        .status(400)
        .send({ message: "There's a problem", error: error.toString() });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const { page, pageSize } = req.query;

      const comments = await Comment.find({
        order: {
          createdAt: "DESC",
        },
      });

      const result = comments.slice(
        Number(page) * Number(pageSize) - Number(pageSize),
        Number(page) * Number(pageSize)
      );

      const template = {
        success: true,
        page: Number(page),
        itemsByPage: Number(pageSize),
        commentsSize: result.length,
        totalComments: comments.length,
        totalPages: Math.ceil(
          comments.length / Number(pageSize) < 1
            ? 1
            : comments.length / Number(pageSize)
        ),
        result: result,
      };

      return res.status(200).send({ template });
    } catch (error: any) {
      return res
        .status(400)
        .send({ message: "There's a problem", error: error.toString() });
    }
  }

  static async getOne(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const comment = await Comment.findOneBy({ id: Number(id) });

      if (!comment)
        return res.status(404).send({ message: "Comment wasn't found" });

      return res.status(200).send({ comment });
    } catch (error: any) {
      return res
        .status(400)
        .send({ message: "There's a problem", error: error.toString() });
    }
  }

  static async deleteComment(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const result = await Comment.delete(id);

      if (result.affected === 0)
        return res.status(404).send({ message: "Comment wasn't found" });

      return res.status(200).send({ message: "Comment deleted" });
    } catch (error: any) {
      return res
        .status(400)
        .send({ message: "There's a problem", error: error.toString() });
    }
  }

  static async updateComment(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const updatedComment = req.body;

      if (
        !updatedComment.ip &&
        !updatedComment.name &&
        !updatedComment.title &&
        !updatedComment.content
      ) {
        return res.status(400).send({ message: "Nothing has been updated" });
      }

      const comment = await Comment.update({ id: Number(id) }, req.body);

      if (comment.affected === 0)
        return res.status(404).send({ message: "Comment wasn't found" });

      return res.status(200).send({ message: "Comment Updated" });
    } catch (error: any) {
      return res
        .status(400)
        .send({ message: "There's a problem", error: error.toString() });
    }
  }
}
