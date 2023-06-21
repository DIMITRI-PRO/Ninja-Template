import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useMessageContext } from "../../context/MessageNotifContext";
import { useAuthContext } from "../../context/AuthContext";
import { Form, FormItem, Button } from "../../components/NinjaComp";

export const Register = () => {
  const { t } = useTranslation();
  const { responseMessage, errors } = useMessageContext();
  const navigate = useNavigate();
  const { requestAPI } = useAuthContext();

  const onSubmit = async (datas) => {
    try {
      const body = datas;
      await requestAPI("post", "register", body);
      navigate("/login");
    } catch (error) {
      responseMessage(error);
    }
  };

  return (
    <Form onSubmit={onSubmit} errors={errors}>
      <FormItem
        label={t("register.label.lastname")}
        type="text"
        dataName="lastname"
      />
      <FormItem
        label={t("register.label.firstname")}
        type="text"
        dataName="firstname"
      />
      <FormItem
        label={t("register.label.pseudo")}
        type="text"
        dataName="pseudo"
      />
      <FormItem
        label={t("register.label.email")}
        type="email"
        dataName="email"
      />
      <FormItem
        label={t("register.label.password")}
        type="password"
        dataName="password"
      />
      <Button type="submit">{t("buttons.register-submit")}</Button>
    </Form>
  );
};
