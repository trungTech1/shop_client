/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslation } from 'react-i18next';

const ChangeLanguage = () => {
  const { i18n } = useTranslation();

  const handleChange = (event: { target: { value: any; }; }) => {
    const newLang = event.target.value;
    localStorage.setItem("lng", newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <select onChange={handleChange} defaultValue={localStorage.getItem("lng") || "en"}>
      <option value="en">EN</option>
      <option value="vi">VI</option>
    </select>
  );
};

export default ChangeLanguage;