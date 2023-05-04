import express, { Request, Response } from "express";
import Todo from "../model/todoModel";
import axios from 'axios'
import { fetchApiData } from "../utils/utility";


export const getFistData = async (req: Request, res: Response) =>{

  try {
    const species = req.params.species
      const response = await fetchApiData(species)

      if(response.length === 0){
         return res.status(404).json({error: "Not found/ an array is empty"})
      }
      return res.status(200).json({fromCache: false, message: response})
    
  } catch (error) {
    console.log(error)
    res.json({error: `error ${error}`})
  }
}





/** ================ .  CREATE TODO OPERATION ======================*/
export const createTodo = async (req: Request, res: Response) => {
  const User = new Todo(req.body);

  try {
    const newTodo = await User.save();
    res.status(200).json({
      message: "You have successfully created your TODO list",
      newTodo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      route: "todo/create router",
    });
  }
};

/** ================ GET TODO LIST    ======================*/

export const getAllTodo = async (req: Request, res: Response) => {
  const todo = await Todo.find({});
  try {
    res.status(200).json({
      message: "Successful",
      todo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      route: "todo/get router",
    });
  }
};

/** ================ UPDATE TODO--LIST   ======================*/

export const updateTODO = async (req: Request, res: Response) => {
  try {
    const update = await Todo.findByIdAndUpdate(req.params.id, req.body);
   return res.status(200).json({
      message: "Successfully updated",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      route: "todo/update router",
    });
  }
};

/** ========================DELETE TODO LIST ============================*/
export const deleteTODO = async (req: Request, res: Response) => {
  try {
    const deleteMe = await Todo.findByIdAndDelete(req.params.id);
    if (!deleteMe) {
      return res.status(404).json({
        message: "This item has been deleted",
      });
    }
    return res.status(200).json({
      message: "You have successfully deleted your TODO item",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      route: "todo/delete router",
    });
  }
};
