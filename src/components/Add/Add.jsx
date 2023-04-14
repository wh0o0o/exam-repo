import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import style from "./Add.css";

const Add = () => {
  const [from, setForm] = useState({
    email: "",
    first_name: "",
    last_name: "",
    message: "",
    product_id: 0,
  });

  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    const response = await fetch("https://api.avavion.ru/api/products");
    const data = await response.json();

    setServices(data.data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const onSubmitHandle = (e) => {
    e.preventDefault();
  };

  const onChangeForm = (e) => {
    setForm((prevState) => {
      prevState = { ...prevState };

      prevState[e.target.name] = e.target.value.trim();

      return prevState;
    });
  };

  const sendRequest = async (body) => {
    console.log(body);
    const response = await fetch(
      "https://api.avavion.ru/api/applications/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    console.log(data);

    if (data.status === true) {
      return Swal.fire({
        icon: "success",
        title: data.message,
      });
    }

    return Swal.fire({
      icon: "error",
      title: data.message,
    });
  };

  const onClickHandle = (e) => {
    e.preventDefault();
    sendRequest(from);
  };

  const onChangeSelectForm = (e) => {
    setForm((prevState) => {
      prevState = { ...prevState };

      prevState[e.target.name] = e.target.options[e.target.selectedIndex].value;

      return prevState;
    });
  };

  return (
    <div className={style.add_wrapper}>
      <h1>Отправить заявку</h1>
      <form onSubmit={(e) => onSubmitHandle(e)}>
        <input
          type="text"
          placeholder="Имя"
          name="first_name"
          onChange={(e) => onChangeForm(e)}
        />
        <input
          type="text"
          placeholder="Фамилия"
          name="last_name"
          onChange={(e) => onChangeForm(e)}
        />
        <textarea
          name="message"
          id=""
          cols="30"
          rows="10"
          placeholder="Сообщение"
          onChange={(e) => onChangeForm(e)}
        ></textarea>
        <select name="product_id" id="" onChange={(e) => onChangeSelectForm(e)}>
          <option selected disabled>
            Выберите товар
          </option>
          {services?.map((item) => {
            return <option value={item.id}>{item.name}</option>;
          })}
        </select>
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={(e) => onChangeForm(e)}
        />
        <input
          type="submit"
          value="ОТПРАВИТЬ"
          onClick={(e) => onClickHandle(e)}
        />
      </form>
    </div>
  );
};

export default Add;
