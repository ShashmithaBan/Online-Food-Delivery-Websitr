import React from 'react';
import { Box, Button, Chip, CircularProgress, FormControl, Grid, IconButton, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import { uploadImageToCloudinary } from '../../util/UploadToCloudinary';

const initialValues = {
  name: "",
  description: "",
  price: "",
  category: "",
  restaurantId: "",
  vegetarian: true,
  seasonal: false,
  ingredients: [],
  images: [],
};

export const CreateMenuForm = () => {
  const [uploadImage, setUploadImage] = useState(false);

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      values.restaurantId = 2;
      console.log('data ---', values);
    }
  });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setUploadImage(true);
    const image = await uploadImageToCloudinary(file);
    formik.setFieldValue("images", [...formik.values.images, image]);
    setUploadImage(false);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  return (
    <div className='py-10 flex flex-col w-full items-center min-h-screen bg-black space-y-10 '>
      <h1 className="font-bold text-3xl text-center text-white">
        Add Menu
      </h1>
      <form onSubmit={formik.handleSubmit} className='space-y-4 px-10 lg:w-[1000px] '>
        <Grid container spacing={2}>
          <Grid item className='flex flex-wrap gap-5 ' xs={12}>
            <input
              type='file'
              accept='image/*'
              id='fileInput'
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
            <label className='relative' htmlFor='fileInput'>
              <span className='w-24 h-24 cursor-pointer flex items-center justify-center p-2 border rounded-md hover:border-green-500'>
                <AddPhotoAlternateIcon className='text-white hover:text-green-500' />
              </span>
              {uploadImage && (
                <div className='absolute left-0 right-0 top-7 bottom-0 w-24 h-24 flex justify-center'>
                  <CircularProgress />
                </div>
              )}
            </label>
            <div className="flex flex-wrap gap-2">
              {formik.values.images.map((item, index) => (
                <div key={index} className="relative">
                  <img
                    className='w-24 h-24 object-cover'
                    src={item}
                    alt=''
                  />
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      outline: "none"
                    }}
                    onClick={() => handleRemoveImage(index)}>
                    <CloseIcon />
                  </IconButton>
                </div>
              ))}
            </div>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth
              id="name"
              name="name"
              label="Name"
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth
              id="description"
              name="description"
              label="Description"
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values.description}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth
              id="price"
              name="price"
              label="Price"
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values.price}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth
              id="category"
              name="category"
              label="Category"
              variant="outlined"
              onChange={formik.handleChange}
              value={formik.values.category}
            />
          </Grid>
          <Grid container xs={8} spacing={2} className='mt-2 pt-5 px-4'>
           
            <FormControl sx={{ m: 2, width: 300 }}>
              <InputLabel id="demo-multiple-chip-label">Ingredients</InputLabel>
              <Select
  labelId="demo-multiple-chip-label"
  id="demo-multiple-chip"
  multiple
  value={formik.values.ingredients} 
  onChange={(event) => {
    const { value } = event.target;
    formik.setFieldValue("ingredients", value); 
  }}
  input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
  renderValue={(selected) => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: "1" }}>
      {selected.map((value) => (
        <Chip key={value} label={value} />
      ))}
    </Box>
  )}
>
  {["Bread", "Sauce"].map((name, index) => (
    <MenuItem
      key={name}
      value={name}
      sx={{ color: "black" }}
    >
      {name}
    </MenuItem>
  ))}
</Select>

            </FormControl>
          </Grid>
        </Grid>
        <Button type='submit' className='mt-4' variant='contained' color='primary'>
          Create Restaurant
        </Button>
      </form>
    </div>
  );
}