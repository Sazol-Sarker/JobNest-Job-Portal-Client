import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import AuthContext from "../context/AuthContext/AuthContext";

const useAdmin = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;

  const { data: roleData, isRoleLoading, isError } = useQuery({
    queryKey: ['userRole', email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/users/${email}`);
      return res.data;
    }
  });

  const isAdmin = roleData?.role === 'admin';

  return { isAdmin, isRoleLoading, isError };
};

export default useAdmin;
