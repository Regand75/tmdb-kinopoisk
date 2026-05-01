import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';
import { VALID_CATEGORY_IDS } from '@/shared/config/movies';

const CategoryMoviesPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const isValid = id && (VALID_CATEGORY_IDS as readonly string[]).includes(id);

  useEffect(() => {
    if (!isValid) {
      navigate('/movies/popular', { replace: true });
    }
  }, [isValid, navigate]);

  if (!isValid) return null;

  return (
    <div>
      <h1>Category: {id}</h1>
    </div>
  );
};

export default CategoryMoviesPage;
