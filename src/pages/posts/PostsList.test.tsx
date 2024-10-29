import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";
import PostsList from "./PostsList";

const queryClient = new QueryClient();

const renderWithClient = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

jest.mock("react-query", () => ({
  ...jest.requireActual("react-query"),
  useQuery: jest.fn(),
  useMutation: jest.fn().mockReturnValue({
    mutate: jest.fn(),
  }),
}));

// Mock Toast notifications
jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useToast: () => jest.fn(),
}));

// PostsList component tests
describe("PostsList Component", () => {
  // Test 1: Render component
  test("renders PostsList component", () => {
    renderWithClient(<PostsList />);
    expect(screen.getByText(/Add New Post/i)).toBeInTheDocument();
    expect(screen.getByText(/View All Posts/i)).toBeInTheDocument();
  });

  // Test 2: Loading state
  test("shows loading spinner while fetching posts", () => {
    (useQuery as jest.Mock).mockReturnValue({ isLoading: true });
    renderWithClient(<PostsList />);
    expect(screen.getByRole("status")).toBeInTheDocument(); // Assuming the Spinner has a role of 'status'
  });

  // Test 3: Successful data fetching
  test("displays fetched posts", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: [
        { id: 1, title: "Post 1", body: "Body of post 1" },
        { id: 2, title: "Post 2", body: "Body of post 2" },
      ],
      isLoading: false,
      error: null,
    });

    renderWithClient(<PostsList />);
    expect(await screen.findByText(/Post 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Post 2/i)).toBeInTheDocument();
  });

  // Test 4: Form submission to add a new post
  test("adds a new post on form submission", async () => {
    renderWithClient(<PostsList />);

    // Fill in form fields
    await userEvent.type(
      screen.getByPlaceholderText("Post title"),
      "New Post Title"
    );
    await userEvent.type(
      screen.getByPlaceholderText("Post body"),
      "This is the body of the new post"
    );

    // Submit form
    fireEvent.submit(screen.getByRole("button", { name: /add post/i }));

    // Check if the toast message appears indicating post addition
    await waitFor(() =>
      expect(screen.getByText(/Post added./i)).toBeInTheDocument()
    );
  });

  // Test 5: Pagination interaction
  test("paginates posts on next and previous button click", async () => {
    renderWithClient(<PostsList />);

    // Check if we start on page 1
    expect(screen.getByText(/Page 1/i)).toBeInTheDocument();

    // Click "Next" to go to Page 2
    fireEvent.click(screen.getByRole("button", { name: /next/i }));
    await waitFor(() =>
      expect(screen.getByText(/Page 2/i)).toBeInTheDocument()
    );

    // Click "Previous" to go back to Page 1
    fireEvent.click(screen.getByRole("button", { name: /previous/i }));
    await waitFor(() =>
      expect(screen.getByText(/Page 1/i)).toBeInTheDocument()
    );
  });

  // Test 6: Error handling on data fetch failure
  test("displays error message on fetch failure", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error("Failed to fetch posts"),
    });

    renderWithClient(<PostsList />);
    expect(screen.getByText(/Error fetching posts/i)).toBeInTheDocument();
  });
});
