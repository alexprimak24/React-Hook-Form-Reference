import React, { useState } from "react";
import "./App.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// npm install react-hook-form
// npm i @hookform/resolvers
// npm i zod

const schema = z.object({
  //ensures that it is a sting, then it checked that it is actually a valid email
  email: z.string().email(),
  password: z.string().min(8),
});

//you don't even need to add types, they just come aotomatically
type FormFields = z.infer<typeof schema>;

function App() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      email: "test@email.com",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
    } catch (error) {
      setError("email", {
        message: "this email is already taken",
      });
    }
  };

  return (
    //that approeach will help us to preventDefault + will validate that all the form fields are valid before calling onSubmit
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} type="text" placeholder="Email" />
      {errors.email && <div>{errors.email.message}</div>}
      <input {...register("password")} type="password" placeholder="Password" />
      {errors.password && <div>{errors.password.message}</div>}
      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
      {/* this is the error that belongs to the whole form, not just to some field */}
      {errors.root && <div>{errors.root.message}</div>}
    </form>
  );
}

export default App;

//great way without ASYNC

// import React, { useState } from "react";
// import "./App.css";
// import { useForm, SubmitHandler } from "react-hook-form";

// type FormFields = {
//   email: string;
//   password: string;
// };

// function App() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormFields>();

//   const onSubmit: SubmitHandler<FormFields> = (data) => {
//     console.log(data);
//   };

//   return (
//     //that approeach will help us to preventDefault + will validate that all the form fields are valid before calling onSubmit
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input
//         {...register("email", {
//           required: "Email is required",
//           validate: (value: string) => {
//             if (!value.includes("@")) {
//               return "Email must include @";
//             }
//             return true;
//           },
//         })}
//         type="text"
//         placeholder="Email"
//       />
//       {errors.email && <div>{errors.email.message}</div>}
//       <input
//         {...register("password", {
//           required: "Password is required",
//           minLength: {
//             value: 8,
//             message: "password must have at least 8 chars",
//           },
//         })}
//         type="password"
//         placeholder="Password"
//       />
//       {errors.password && <div>{errors.password.message}</div>}
//       <button type="submit">Submit</button>
//     </form>
//   );
// }

// export default App;

//typical way - good for simple forms
// import React, { useState } from "react";
// import logo from "./logo.svg";
// import "./App.css";

// function App() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState<{ email: string; password: string }>({
//     email: "",
//     password: "",
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setErrors({ email: "", password: "" });

//     //Manual validation
//     if (!email.includes("@")) {
//       setErrors({ ...errors, email: "Email must include @" });
//       return;
//     }

//     if (password.length < 8) {
//       setErrors({ ...errors, password: "Password must be at least 8 chars" });
//       return;
//     }

//     console.log("Form submitted");
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       {errors.email && <div>{errors.email}</div>}
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       {errors.password && <div>{errors.password}</div>}
//       <button type="submit">Submit</button>
//     </form>
//   );
// }

// export default App;
