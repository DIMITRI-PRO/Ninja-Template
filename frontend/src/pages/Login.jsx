import { useAuthContext } from "../context/AuthContext";
import { Form, FormItem, Button } from "../components/NinjaComp";

export const Login = () => {
  const { requestAPI, setIsLogin, setUser } = useAuthContext();

  const onSubmit = async (datas) => {
    try {
      const body = datas;
      const { data } = await requestAPI("post", "login", body);
      if (data) {
        setIsLogin(true);
        setUser(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <FormItem label="Email :" type="email" dataName="email" />
      <FormItem label="Password :" type="password" dataName="password" />
      <Button type="submit">Login</Button>
    </Form>
  );
};
