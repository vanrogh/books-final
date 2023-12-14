import { NavLink } from "react-router-dom"
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="not-found">
      <h2>Страница не найдена!</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia alias cupiditate ad nostrum doloribus iste tempora quisquam excepturi repellat, fugit cumque dolore magni possimus inventore neque provident! Sunt, quo eos?</p>

      <p>Вернутья на <NavLink to="/">Главную</NavLink>.</p>
    </div>
  )
}