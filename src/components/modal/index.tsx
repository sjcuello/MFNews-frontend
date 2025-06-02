import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import styles from './styles.module.css';

interface ModalProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  bulk?: boolean;
}

const Modal = ({ open, handleClose, handleConfirm, bulk }: ModalProps) => {
  const title = bulk ? 'Delete Selected Items?' : 'Delete Item?';
  const message = bulk
    ? 'Are you sure you want to delete all selected items? This action cannot be undone.'
    : 'Are you sure you want to delete this item? This cannot be undone.';

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box className={styles.modal}>
        <DialogTitle>
          <Typography fontWeight={500}>
            {title}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default Modal;
