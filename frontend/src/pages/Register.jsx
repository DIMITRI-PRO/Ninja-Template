import { useAuthContext } from "../context/AuthContext";
import { Form, FormItem, Button } from "../components/NinjaComp";

export const Register = () => {
  const { requestAPI } = useAuthContext();

  const onSubmit = async (datas) => {
    try {
      const body = datas;
      await requestAPI("post", "register", body);

      document.location.href = "login";
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <FormItem label="Lastname :" type="text" dataName="lastname" />
      <FormItem label="Firstname :" type="text" dataName="firstname" />
      <FormItem label="Pseudo :" type="text" dataName="pseudo" />
      <FormItem label="Email :" type="email" dataName="email" />
      <FormItem label="Password :" type="password" dataName="password" />
      <Button type="submit">Register</Button>
    </Form>
  );
};
