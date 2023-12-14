import { Outlet, NavLink, ScrollRestoration } from "react-router-dom";
import '../App';

export default function RootLayout() {
  return (
    <div className="root-layout">
      <ScrollRestoration />
      <div className="navbar">
            <div>
              <NavLink to="/">
                <h1>React Books</h1>
              </NavLink>
            </div>
            <div>
                <NavLink to="favorites">
                    <h3>Избранные</h3>
                </NavLink>
            </div>
        </div>

      <main>
        <Outlet />
      </main>

        <div className='footer'>
            <p>Books App 2023&copy;</p>
        </div>
    </div>
  )
}