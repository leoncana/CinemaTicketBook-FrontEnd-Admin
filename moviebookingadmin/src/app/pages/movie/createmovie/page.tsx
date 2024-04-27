"use client"
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import '../movie.sass'

interface Movie {
  title: string;
  description: string;
  imgUrl: string;
  rating: number;
  genre: string[];
  duration: number;
}

const CreateMoviePage = () => {

  const [movie, setMovie] = useState<Movie>({
    title: "",
    description: "",
    imgUrl: "",
    rating: 0,
    genre: [],
    duration: 0,
  });

  const genres = [
    "Action",
    "Comedy",
    "Drama",
    "Fantasy",
    "Horror",
    "Science Fiction",
    "Thriller",
    "Other",
  ];

  const handleGenreChange = (genre: string) => {
    if (movie.genre.includes(genre)) {
      setMovie({
        ...movie,
        genre: movie.genre.filter((selectedGenre) => selectedGenre !== genre),
      });
    }
    else {
      setMovie({ ...movie, genre: [...movie.genre, genre] });

    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setMovie({ ...movie, [name]: value });
  };

  const uploadImage = async (image: File) => {
    try {
      const formData = new FormData();
      formData.append("myimage", image);
      const response = await fetch(
        `http://localhost:8000/image/uploadimage`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Image uploaded successfully:", data);
        return data.imageUrl;
      } else {
        console.error("Failed to upload the image.");
        return null;
      }
    }
    catch (error) {
      console.error("Error:", error);
      return null;
    }
  }
  const handleCreateMovie = async () => {
    try {
      if (
        movie.title === "" ||
        movie.description === "" ||
        movie.rating === 0 ||
        movie.genre.length === 0 ||
        movie.duration === 0
      ) {
        toast.error("Please fill all the fields");
        return;
      }

      // let imgUrl = movie.imgUrl;
      
      // if (movie.portraitImg) {
      //   imgUrl = await uploadImage(movie.portraitImg);
      //   if (!imgUrl) {
      //     toast.error("Portrait Image upload failed");
      //     return;
      //   }
      // }
      

      const newMovie = { ...movie };

      const response = await fetch(
        `http://localhost:8000/movie/createmovie`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMovie),
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Movie creation successful", data);

        toast.success("Movie Created Successfully");
      } else {
        console.error("Movie creation failed", response.statusText);
        toast.error("Movie Creation Failed");
      }
    }
    catch (error) {
      console.error("An error occurred during movie creation", error);
    }
  }

  return (
    <div className="formpage"  style={{
      display: 'flex',
      flexDirection: 'column',
  }}>
    <label> Title </label>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={movie.title}
        onChange={handleInputChange}
      />
      <br />
      <label>Description</label>
      <input
        type="text"
        name="description"
        placeholder="Movie description"
        value={movie.description}
        onChange={handleInputChange}
      />
      <br />
      <label>Portrait Image</label>
      <input type="text" name="imgUrl"
        value={movie.imgUrl}
        onChange={handleInputChange}
      />
      
      <br />

      <label>Rating</label>
      <input type="number" name="rating" placeholder="Rating"
        value={movie.rating}
        onChange={handleInputChange}
      />
      <br />

      <div>
        <p>Select Genres:</p>
        {genres.map((genre) => (
          <label id="genre" key={genre}>
            <input type="checkbox" name="genre"
              checked={movie.genre.includes(genre)}
              onChange={() => handleGenreChange(genre)}
            />
            {genre}
          </label>
        ))}
      </div>

      <br />

      <label>Duration</label>
      <input type="number" name="duration" placeholder="Duration"
        value={movie.duration}
        onChange={handleInputChange}
      />
      <br />

      <button onClick={handleCreateMovie}>Create Movie</button>
    </div>
  )
}

export default CreateMoviePage