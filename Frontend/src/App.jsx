import Login from "./components/Login";
import ToDoForm from "./ToDoForm";
import SignUp from "./components/SignUp";
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Login />,
		},
		{
			path: "/signup",
			element: <SignUp />,
    },
    {
      path: "/todo",
      element:<ToDoForm/>
    }
	]);
	return (
    <>
      <RouterProvider router={router}>
        
      </RouterProvider>
		</>
	);
}

export default App;
