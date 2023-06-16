import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "../../context/AuthContext";
import { Form, FormItem, Button } from "../../components/NinjaComp";

export const Login = () => {
  const { t } = useTranslation();
  const { requestAPI, setIsLogin, setUser } = useAuthContext();
  const navigate = useNavigate();

  const onSubmit = async (datas) => {
    try {
      const body = datas;
      const { data } = await requestAPI("post", "login", body);
      if (data) {
        setIsLogin(true);
        setUser(data);
        navigate("/");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <FormItem label={t("login.label.email")} type="email" dataName="email" />
      <FormItem
        label={t("login.label.password")}
        type="password"
        dataName="password"
      />
      <Button type="submit">{t("buttons.login-submit")}</Button>
    </Form>
  );
};
