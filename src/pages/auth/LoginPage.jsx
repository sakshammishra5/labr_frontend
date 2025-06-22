import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UserSchema } from "@/Schema/signupSchema"
import { changeAuthenticationStatus, SaveUser } from "@/store/Slices/app.slice"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router"
import { toast } from "sonner"

const LoginPage = () => {
    const [isSubmitting, setisSubmitting] = useState(false);
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const form = useForm({
        resolver: zodResolver(UserSchema),
        defaultValues: {
            username: "",
            password: "",
            email: "",
            confirmPassword: "",
        }
    })

    const onSubmit = async (data) => {
        console.log("Form submitted with data:", data);
        setisSubmitting(true);
        try {
            let response = await axios.post("http://localhost:4444/auth/login", data)
            // console.log("response", response);
            const token = response.data.token;
            if (token) {
                localStorage.setItem("jwt_token", token);
                // console.log("Token stored in localStorage:", token);
                console.log("user from server", response.data.user);
                dispatch(SaveUser(response.data.user));
                dispatch(changeAuthenticationStatus(true));
                
            }

            navigate("/");
            setisSubmitting(false);

            toast("Success",
                {
                    style: {
                        backgroundColor: "#4CAF50", // Green background
                        color: "white", // White text
                        border: "2px solid #388E3C", // Darker green border
                        borderRadius: "8px", // Rounded corners
                        padding: "10px", // Custom padding
                    },
                    description: response?.data?.message || "Logged In"
                })

        } catch (error) {

        }
        // setTimeout(() => {
        //     setisSubmitting(false);
        // },1000)

        // Add your logic here (e.g., API call)
    };


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <h1 className="text-center text-2xl font-medium">Login</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>UserName</FormLabel>
                                    <FormControl>
                                        <Input placeholder="username" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="email" type="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="password" type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>confirmPassword</FormLabel>
                                    <FormControl>
                                        <Input placeholder="confirmPassword" type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Add more FormFields for email and password if needed */}
                        <Button
                            className="text-center"
                            variant="outline"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ?
                                (<>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    <span>Loading...</span>
                                </>) : "submit"}
                        </Button> {/* Optional: Add a submit button */}
                    </form>
                    <p>Dont have an account? <Link to="/signup" replace>Signup</Link></p>
                </Form>
            </div>
        </div>
    )
}

export default LoginPage
