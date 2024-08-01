import { Route, Routes } from "react-router-dom";

import PostForm from "../pages/posts/PostForm";
import LandingPage from "../pages/landing/LandingPage";
import UsersList from "../pages/users/UsersList";
import PostsList from "../pages/posts/PostsList";
import CommentsList from "../pages/comments/CommentsList";
import AlbumsList from "../pages/albums/AlbumList";
import PhotosList from "../pages/photos/PhotosList";
import TodoList from "../pages/todos/TodoList";
import PostDetails from "../pages/posts/PostDetails";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/users" element={<UsersList />} />
      <Route path="/posts" element={<PostsList />} />
      <Route path="/posts/:id" element={<PostDetails />} />
      <Route path="/add-post" element={<PostForm />} />
      <Route path="/comments" element={<CommentsList />} />
      <Route path="/albums" element={<AlbumsList />} />
      <Route path="/photos" element={<PhotosList />} />
      <Route path="/todos" element={<TodoList />} />
    </Routes>
  );
};

export default AppRoutes;
