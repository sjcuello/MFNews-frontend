import { AppBar, Box, Button, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { Add as AddIcon, DeleteSweepOutlined as DeleteSweepOutlinedIcon, Edit as EditIcon } from '@mui/icons-material';
import styles from './styles.module.css';
import Drawer from '../drawer';
import { RootState, useAppDispatch } from '../../redux';
import { switchDrawer } from '../../redux/drawer';
import { useNavigate, useParams } from 'react-router-dom';
import { setItemSelected } from '../../redux/articleSelected';
import { setItemDrawer } from '../../redux/itemDrawer';
import { useSelector } from 'react-redux';
import { selectArticleById } from '../../redux/articles';
import { editArticle } from '../../redux/articles/thunk';


const Navbar: React.FC = () => {
  const { id } = useParams();
  console.log({ id })
  const dispatch = useAppDispatch();
  const handleDrawerToggle = () => {
    if (id) {
      handleEdit();
    }
    dispatch(switchDrawer());
  };
  const navigate = useNavigate();

  const handleTrashClick = () => {
    navigate('/trash-bin');
  };

  const handleHomeClick = () => {
    navigate('/');
  }
  
  const article = useSelector((state: RootState) =>
    selectArticleById(state, Number(id))
  )!;


  const handleEdit = () => {
    dispatch(setItemSelected(article));
    dispatch(setItemDrawer(article));
  }

  const handleDelete = () => {
    const updatedItem = { ...article, markAsDeleted: !article.markAsDeleted };
    dispatch(editArticle(updatedItem));
  }

  return (
    <Box className={styles.headerContainer}>
      <AppBar className={styles.appBar}>
        <Toolbar className={styles.toolbar}>
          <Typography
            variant="h4"
            fontWeight={800}
            component="div"
            className={styles.title}
            onClick={handleHomeClick}
          >
            MFNews
          </Typography>
          <Box className={styles.iconContainer}>
            {id &&
              <Button variant="text" color="inherit" onClick={handleDelete}>
                <Typography
                  variant="body1"
                  className={styles.titles}
                >
                  Delete article
                </Typography>
              </Button>}
            <IconButton
              color="inherit"
              aria-label="open trash bin"
              edge="start"
              onClick={handleTrashClick}
              className={styles.icon}
            >
              <Tooltip title="Trash bin">
                <DeleteSweepOutlinedIcon />
              </Tooltip>
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={styles.icon}
            >
              <Tooltip title={id ? "Edit article" : "Add article"}>
                {id ? <EditIcon /> : <AddIcon />}
              </Tooltip>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer />
    </Box>
  )
}

export default Navbar;
