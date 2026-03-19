
import { Link } from 'react-router-dom';
import LoginPageTemplate from '../components/login/LoginPage';


export default function Login() {
    return (
            
            <div className="flex h-screen w-full items-center justify-center bg-gray-200 dark:bg-gray-800 p-4">
                <LoginPageTemplate />
            </div>
    );
}