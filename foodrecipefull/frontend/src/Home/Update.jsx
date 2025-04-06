import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';

function Update() {
  const [formdata, setFormData] = useState({
    name: "",
    ingredients: "",
    timeToCook: "",
    steps: "",
    image: null,
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/recipes/${id}`);
        const { name, ingredients, timeToCook, steps, image } = response.data;
        setFormData({
          name,
          ingredients: ingredients.join(', '),
          timeToCook,
          steps: steps.join('. '),
          image: image || null,
        });
      } catch (error) {
        console.error("Error fetching recipe data:", error);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formdata,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formdata,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("You need to log in first", {
        position: toast.POSITION.TOP_CENTER,
        theme: 'colored',
      });
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    const formattedData = new FormData();
    formattedData.append("name", formdata.name);
    formattedData.append("ingredients", formdata.ingredients);
    formattedData.append("timeToCook", formdata.timeToCook);
    formattedData.append("steps", formdata.steps);

    if (formdata.image instanceof File) {
      formattedData.append("image", formdata.image);
    }

    try {
      const response = await axios.put(`http://localhost:3000/recipes/${id}`, formattedData, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        },
      });

      if (response.status === 200) {
        toast.success("Recipe Updated Successfully", {
          position: toast.POSITION.TOP_CENTER,
          theme: 'colored',
        });
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      console.error("Error updating recipe:", error);
      toast.error("Error, data is not valid", {
        position: toast.POSITION.TOP_CENTER,
        theme: 'colored',
      });
    }
  };

  return (
    <div style={{ backgroundColor: '#f0f8ff', minHeight: '100vh', paddingTop: '40px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
        <u>Update Recipe</u>
      </h1>

      <div
        className='container'
        style={{
          backgroundColor: '#ffffff',
          padding: '30px',
          borderRadius: '15px',
          maxWidth: '600px',
          margin: '0 auto',
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
        }}
      >
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className='form-group mb-3'>
            <label><strong>Recipe Name:</strong></label>
            <input type='text' name='name' className='form-control' value={formdata.name} onChange={handleInput} required />
          </div>

          <div className='form-group mb-3'>
            <label><strong>Ingredients (comma-separated):</strong></label>
            <input type='text' name='ingredients' className='form-control' value={formdata.ingredients} onChange={handleInput} required />
          </div>

          <div className='form-group mb-3'>
            <label><strong>Time to Cook:</strong></label>
            <input type='text' name='timeToCook' className='form-control' value={formdata.timeToCook} onChange={handleInput} required />
          </div>

          <div className='form-group mb-3'>
            <label><strong>Steps (separate by full stops '.')</strong></label>
            <textarea name='steps' className='form-control' value={formdata.steps} onChange={handleInput} rows="4" required></textarea>
          </div>

          <div className='form-group mb-4'>
            <label><strong>Upload New Recipe Image (optional):</strong></label>
            <input type='file' name='image' className='form-control' onChange={handleFileChange} />
          </div>

          <div style={{ textAlign: 'center' }}>
            <button type='submit' className='btn btn-primary px-4 py-2'>Update</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Update;
