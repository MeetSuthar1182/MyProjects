import { useForm } from 'react-hook-form'
import './App.css'

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function funcSubmit(e) {
    e.preventDefault();

    console.log("Submitting..."); // 👈 check this

    const data = {
      email: e.target.email.value,
      password: e.target.password.value
    };

    try {
      let r = await fetch('http://localhost:3000/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      let res = await r.text();
      console.log("Response:", res);

    } catch (err) {
      console.error("Error:", err);
    }
  }

  return (
    <form onSubmit={handleSubmit(funcSubmit)}>
      <input type="email" name="email" placeholder="Email" {...register('email', {required: "please fill your email address!!!",
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "invalid email format"
        }
      })} />
      {errors.email && <p className="err-msg">{errors.email.message}</p>}

      <input type="password" name="password" placeholder="Password" {...register('password', {required: "please fill your password!!!",
        minLength: {
          value: 6,
          message: "minimum 6 characters"
        },
        maxLength:{
          value: 8,
          message: "maximum 8 characters"
        }
      })}/>
      {errors.password && <p className="err-msg">{errors.password.message}</p>}

      <button type="submit">Submit</button>
    </form>
  );
}

export default App;