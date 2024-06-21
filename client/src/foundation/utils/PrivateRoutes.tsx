import React, { useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../features/authAPI";

interface ProtectedRoutesProps {
    children: ReactNode;
}

const PrivateRoutes: React.FC<ProtectedRoutesProps> = ({
    children,
}): React.JSX.Element => {
    const navigate = useNavigate();

    useEffect(() => {
        async function checkAuthentication() {
            const res = await isLoggedIn();
            if (!res.auth) {
                return navigate("/auth/login", { replace: true });
            }
        }
        checkAuthentication();
    }, [navigate]);

    return <React.Fragment>{children}</React.Fragment>;
};

export default PrivateRoutes;