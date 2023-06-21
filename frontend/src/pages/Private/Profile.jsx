import { useTranslation } from "react-i18next";
import { useMessageContext } from "../../context/MessageNotifContext";
import { useAuthContext } from "../../context/AuthContext";
import { Form, FormItem, Button } from "../../components/NinjaComp";

export const Profile = () => {
  const { t } = useTranslation();
  const { responseMessage } = useMessageContext();
  const { requestAPI, authMemo, setUser } = useAuthContext();
  const { id, user } = authMemo;

  const updateUser = async (body) => {
    try {
      await requestAPI("patch", `users/${id}`, body);

      setUser((prev) => {
        return { ...prev, ...body };
      });
    } catch (e) {
      responseMessage(e);
    }
  };

  return (
    id && (
      <>
        <div>{t("profile.title")}</div>
        <Form onSubmit={updateUser} initialValues={user}>
          <FormItem
            label={t("register.label.lastname")}
            type="text"
            dataName="lastname"
            required
          />
          <FormItem
            label={t("register.label.firstname")}
            type="text"
            dataName="firstname"
            required
          />
          <FormItem
            label={t("register.label.pseudo")}
            type="text"
            dataName="pseudo"
            required
          />
          <Button type="submit">{t("buttons.save")}</Button>
        </Form>
      </>
    )
  );
};
