import { Box, Button, Typography } from '@mui/material';
import CardItem from '../cardItem';
import styles from './styles.module.css';
import { deleteItemsList, selectArticleList } from '../../redux/articles';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchAllArticles, removeArticles } from '../../redux/articles/thunk';
import Loading from '../loading';
import ListEmpty from '../listEmpty';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../redux';
import Modal from '../modal';

const TrashBin = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { data, status } = useSelector(selectArticleList);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllArticles());
    }
  }, [status, dispatch]);

  const handleDeleteItems = () => {
    const articleIds = data.filter(item => item.isChecked).map(item => item.id);
    if (articleIds.length > 0) {
      dispatch(removeArticles(articleIds));
      dispatch(deleteItemsList(articleIds));
      setOpen(false)
    }
  };

  return (
    <Box className={styles.container}>
      {
        data.length > 0 && data.some(item => item.markAsDeleted) ? (<>
          <Box className={styles.titleContainer}>
            <Typography variant='h2'>Trash Bin</Typography>
            {data.some(item => item.isChecked) && <Button
              variant="contained"
              color='primary'
              onClick={() => setOpen(true)}
            >Delete items</Button>}
          </Box>
          <Box className={styles.cardContainer}>
            {data.map((item, index) => {
              if (item.markAsDeleted) {
                return <CardItem key={index} data={item} />;
              }
            })}
          </Box>
        </>
        ) : status === 'pending' ? (
          <Loading />
        ) : <ListEmpty
          text="Your trash bin is empty :)"
          textButton="Back to Home"
          handleClick={() => navigate('/')}
        />
      }
      <Modal open={open} handleClose={() => setOpen(false)} handleConfirm={handleDeleteItems} bulk/>
    </Box>
  )
}

export default TrashBin;
