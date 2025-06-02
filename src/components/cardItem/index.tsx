import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { Article } from '../../interfaces';
import {
  CheckBoxOutlineBlank as CheckBoxBlankIcon,
  CheckBox as CheckBoxIcon,
  DeleteForeverOutlined as DeleteForeverIcon,
  UndoOutlined as UndoIcon
} from '@mui/icons-material';
import styles from './styles.module.css';
import { useAppDispatch } from '../../redux';
import { editArticle, removeArticle } from '../../redux/articles/thunk';
import { useCallback, useState } from 'react';
import Modal from '../modal';
import { checkItemList, deleteItemList } from '../../redux/articles';

interface CardProps {
  data: Article
}

const CardItem = ({ data }: CardProps) => {

  const [open, setOpen] = useState(false);
  const { title, description, isChecked } = data;
  const dispatch = useAppDispatch();

  const handleCheck = useCallback(() => {
    dispatch(checkItemList({ ...data, isChecked: !isChecked }));
  }, [data, dispatch, isChecked]);

  const handleSwitchMarkDelete = () => {
    const updatedItem = { ...data, markAsDeleted: !data.markAsDeleted };
    dispatch(editArticle(updatedItem));
  }

  const handleDelete = () => {
    dispatch(removeArticle(data.id));
    dispatch(deleteItemList(data.id));
    setOpen(false)
  }

  const actionButtons = [
    { icon: <UndoIcon />, onClick: handleSwitchMarkDelete, label: 'Restore', tooltip: 'Restore' },
    { icon: <DeleteForeverIcon />, onClick: () => setOpen(true), label: 'Delete Forever', tooltip: 'Delete Forever' }
  ]
  return (
    <Box className={`${styles.card} ${isChecked && styles.cardChecked}`}>
      <IconButton
        color='info'
        aria-label="Edit"
        onClick={handleCheck}
        className={styles.menuIcon}
      >
        {isChecked ? <CheckBoxIcon /> : <CheckBoxBlankIcon />}
      </IconButton>
      <Box className={styles.content}>
        <Box className={styles.dataContainer}>
          <Typography variant="h4" color='info' fontWeight="500" className={styles.name}>{title} </Typography>
          <Typography variant="h6" className={styles.description}>{description}</Typography>
        </Box>
        <Box>
          {
            actionButtons.map((button, index) => (
              <IconButton
                key={index}
                color="default"
                aria-label={button.label}
                onClick={button.onClick}
                className={styles.menuIcon}
              >
                <Tooltip title={button.tooltip} arrow>
                  {button.icon}
                </Tooltip>
              </IconButton>
            ))
          }
        </Box>
      </Box>
      <Modal open={open} handleClose={() => setOpen(false)} handleConfirm={handleDelete} />
    </Box>
  )
}

export default CardItem;
