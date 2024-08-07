import { Project, GuestList } from "../models/projects";
import { User } from "../models/users";
import { Request, Response, NextFunction } from "express";
import { codeSnippets } from "../constants";
import { MongoError } from 'mongodb';

export const getUserProjects = async (req: Request, res: Response) => {
	try {
		const userId = req.params.userId;
		const OwnedProject = await Project.find({ owner: userId }).populate("owner")

		//clean up guest project, populate both guest info and project info
		const guest = await GuestList.
			find({ guestId: userId })
			.populate({
				path: 'projectId',
				populate: {
					path: 'owner',
					model: 'User'
				}
			});
		const GuestProject = guest.map(guest => guest.projectId);
		return res.status(200).json({owner: OwnedProject, guest:GuestProject});
	} catch (error) {
		console.error("Error in getUserProjects ", (error as Error).message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getProject = async (req: Request, res: Response) => {
	try {
		const projectId = req.params.projectId
		const returnProject = await Project.findById(projectId).populate("owner");
		return res.status(200).json(returnProject);
	}
	catch (err) {
		console.error("Error in getProjects ", (err as Error).message);
		res.status(500).json({ error: "Internal server error" });
	}
}

export const createProject = async (req: Request, res: Response) => {
  try {
		let project = new Project(req.body);
		if (project.language in codeSnippets) {
			// add default code.
			project.code = codeSnippets[project.language]
		}
		const newProject = await project.save();
		await newProject.populate("owner");
    return res.status(201).json(newProject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while creating the project.' });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
	try {
		const { userId, projectId } = req.body
		const deleteProject = await Project.findById(projectId);
		if (userId == deleteProject.owner.toString()) {
			await deleteProject.deleteOne();
			// delete all ref
			await GuestList.deleteMany({projectId: projectId })
			return res.status(200).json({ message: "Delete Successfully" })
			
		}
		else {
			return res.status(404).json({message:"Must be owner in order to delete"})
		}
	}
	catch (err) {
		console.error(err);
		return res.status(500).json({ error: 'An error occurred while deleting the project.' });
	}
}

export const shareProject = async (req: Request, res: Response) => {
  try {
    const { ownerId, guestEmail, projectId } = req.body;
		const shareProject = await Project.findById(projectId).populate("owner");

    if (!shareProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

		// Only owner can share 
    if (shareProject.owner._id.toString() !== ownerId) {
      return res.status(401).json({ message: 'You are not authorized to share' });
		}
		
		// Cannot add yourself to the guest lists
		if (shareProject.owner.email === guestEmail) {
			return res.status(404).json({ message: "Please enter appropriate user's email" });
		}

		// User does not exist
    const guestUser = await User.findOne({ email: guestEmail });
    if (!guestUser) {
      return res.status(404).json({ message: 'The user does not exist!' });
    }

    const guest = new GuestList({ guestId: guestUser._id, projectId: projectId });
    await guest.save();

    return res.status(201).json({ message: 'Shared successfully' });
  } catch (err) {
    if ((err as MongoError).code === 11000) {
      return res.status(405).json({ message: 'The user is already a guest of the project' });
    }

    console.error('Error sharing project:', err);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};
