import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LoginPage from "./LoginPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryclient = new QueryClient()

describe("LoginPage", () => {
  it("should render required fields correctly", () => {
    render(
    <QueryClientProvider client={queryclient}>
      <LoginPage />
    </QueryClientProvider>
    );
    // Add your assertions here

    // screen mai three types methods are available
    // get,find,query
    // get will throw an error if element is not found
    //find will return a promise and will wait for the element
    //to appear
    // query will return null if element is not found
    expect(screen.getByText("Sign in")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button",{name:"Log in"})).toBeInTheDocument();
    expect(screen.getByRole("checkbox",{name:"Remember me"})).toBeInTheDocument();
    expect(screen.getByText("Forgot password?")).toBeInTheDocument();
  });
});
