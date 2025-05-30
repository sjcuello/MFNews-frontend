import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { Article } from '../../interfaces';
import {
  EditOutlined as EditIcon,
  DeleteOutlined as DeleteIcon,
  CheckBoxOutlineBlank as CheckBoxBlankIcon,
  CheckBox as CheckBoxIcon,
  DeleteForeverOutlined as DeleteForeverIcon,
  UndoOutlined as UndoIcon
} from '@mui/icons-material';
import styles from './styles.module.css';
import { useAppDispatch } from '../../redux';
import { editArticle, removeArticle } from '../../redux/articles/thunk';
import { setItemDrawer } from '../../redux/itemDrawer';
import { switchDrawer } from '../../redux/drawer';
import { useCallback, useState } from 'react';
import Modal from '../modal';
import { setItemSelected } from '../../redux/articleSelected';
import { deleteItemList } from '../../redux/articles';


interface CardProps {
  data: Article
  isInTrashBin?: boolean
}

const CardItem = ({ data, isInTrashBin }: CardProps) => {

  const [open, setOpen] = useState(false);
  const {  title, description, isChecked } = data;
  const dispatch = useAppDispatch();

  const handleEdit = () => {
    const {  title, subtitle, description, imageUrl, author } = data
    dispatch(setItemSelected(data));
    dispatch(setItemDrawer({ title, subtitle, description, imageUrl, author }));
    dispatch(switchDrawer());
  }

  const handleCheck = useCallback(() => {
    const updatedItem = { ...data, isChecked: !isChecked };
    dispatch(editArticle(updatedItem));
  }, [data, isChecked, dispatch]);

  const handleSwitchMarkDelete = () => {
    const updatedItem = { ...data, markAsDeleted: !data.markAsDeleted };
    dispatch(editArticle(updatedItem));
  }

  const handleDelete = () => {
    dispatch(removeArticle(data.id));
    dispatch(deleteItemList(data.id));
    setOpen(false)
  }

  const actionButtons = isInTrashBin
    ? [
      { icon: <UndoIcon />, onClick: handleSwitchMarkDelete, label: 'Restore', tooltip: 'Restore' },
      { icon: <DeleteForeverIcon />, onClick: () => setOpen(true), label: 'Delete Forever', tooltip: 'Delete Forever' }
    ]
    : [
      { icon: <EditIcon />, onClick: handleEdit, label: 'Edit', tooltip: 'Edit' },
      { icon: <DeleteIcon />, onClick: handleSwitchMarkDelete, label: 'Mark as Deleted', tooltip: 'Mark as Deleted' }
    ];

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
          {/* <Typography variant="body2" className={styles.amount}>Amount: {amount}</Typography> */}
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
