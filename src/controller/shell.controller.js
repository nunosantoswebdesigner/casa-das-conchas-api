import mongoose from "mongoose";
import Shell from "../model/Shell.js";
import QRCode from 'qrcode';
import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAll = async (req, res) => {
  try {
    const allShell = await Shell.find();
    return res.status(200).json(allShell);
  } catch (err) {
    res.status(400).json("Error: " + err.message);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const shell = await Shell.findById(id);
    return res.status(200).json({message: "success" , shell: shell});
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteById = async (req, res) => {
  try {
    const shell = await Shell.findByIdAndDelete(req.params.id);
    if (!shell) {
      return res.status(404).send();
    }
    res.send(shell);
    } catch (error) {
      res.status(500).send(error);
    }
};

const create = async (req, res) => {
  try {

    const newID = mongoose.Types.ObjectId()
    let qr = ''
    
    QRCode.toDataURL(newID.toString())
    .then(url => { qr = url })
    .catch(err => { console.error(` Something went wrong || Error: ${err} `) })
    
    const { name, prompt, photo, location, category } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);
    const qrcodeUrl = await cloudinary.uploader.upload(qr);

    const newShell = await Shell.create({
      _id: newID,
      name,
      prompt,
      photo: photoUrl.url,
      qrcode: qrcodeUrl.url,
      location,
      category
    });

    res.status(200).json(newShell);
  } catch (err) {
    res.status(500).json({ success: false, message: `Something went wrong || Error: ${err}` });
  }
};

const updateById = async (req, res) => {
  try {
    const shell = await Shell.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if (!shell) {
      return res.status(404).send();
    }
    res.status(200).send(shell);
  } catch (error) {
    res.status(500).send(error);
  }
};

export default { getAll, create, getById, updateById, deleteById };