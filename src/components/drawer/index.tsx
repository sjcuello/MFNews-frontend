import { Box, Button, Divider, Drawer as DrawerMUI, IconButton, TextField, Typography } from "@mui/material"
import Textarea from '@mui/joy/Textarea';
import StartIcon from '@mui/icons-material/Start';
import { useFormik } from 'formik';
import { articleValidationSchema } from "../../validations/item.validation";
import styles from './styles.module.css';
import { CssVarsProvider } from '@mui/joy/styles';
import { useAppDispatch } from '../../redux';
import { ArticleForm } from "../../interfaces";
import { addArticle, editArticle } from '../../redux/articles/thunk';
import { selectDrawer, switchDrawer } from "../../redux/drawer";
import { useSelector } from "react-redux";
import { isItemDrawerEmpty, selectItemDrawer, setClear } from "../../redux/itemDrawer";
import { useEffect } from "react";
import { selectArticleSelected } from "../../redux/articleSelected";
import { selectAllTitles } from "../../redux/articles";


const Drawer = () => {
  const dispatch = useAppDispatch();
  const handleDrawerToggle = () => {
    dispatch(switchDrawer());
    dispatch(setClear());
  };

  const isDrawerOpen = useSelector(selectDrawer);
  const itemDrawer = useSelector(selectItemDrawer);
  const isNewItem = useSelector(isItemDrawerEmpty);
  const itemSelected = useSelector(selectArticleSelected);
  const currentTitles = useSelector(selectAllTitles);

  const initialValues = isNewItem ? {
    title: '',
    subtitle: '',
    description: '',
    imageUrl: '',
    author: '',
    content: '',
    category: ''
  } : itemDrawer;

  const formik = useFormik({
    initialValues,
    validationSchema: articleValidationSchema(isNewItem ? currentTitles : currentTitles.filter((title) => title !== itemDrawer.title)),
    onSubmit: (values: ArticleForm) => {
      if (isNewItem) {
        dispatch(addArticle(values));
      } else {
        const updatedItem = { ...itemSelected, ...values };
        dispatch(editArticle(updatedItem));
      }
      formik.resetForm();
      handleDrawerToggle()
    },
    onReset: handleDrawerToggle,
  });

  useEffect(() => {
    if (isNewItem) {
      dispatch(setClear());
    }
    if (!isNewItem && itemDrawer) {
      formik.setValues(itemDrawer);
    }
  }, [isNewItem, itemDrawer]);


  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <DrawerMUI
      container={container}
      anchor='right'
      variant="temporary"
      open={isDrawerOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <Box className={styles.drawer}>
        <Box className={`${styles.topContainer} ${styles.basicXPadding}`}>
          <Typography variant="h6" className={styles.drawerTitle}>
            MFNews
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ padding: 0 }}
          >
            <StartIcon />
          </IconButton>
        </Box>

        <Divider />
        <Box className={`${styles.content} ${styles.basicXPadding}`}>
          <Box className={styles.infoContainer}>
            <Typography variant="body1" fontWeight="500" className={styles.drawerTitle}>
              {isNewItem ? 'Add a new article' : 'Edit existing article'}
            </Typography>
            <form onSubmit={formik.handleSubmit} onReset={formik.handleReset} className={styles.form}>
              <Box className={styles.formInputs}>
                <TextField
                  fullWidth
                  id="imageUrl"
                  name="imageUrl"
                  label="Image URL"
                  value={formik.values.imageUrl}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.imageUrl && Boolean(formik.errors.imageUrl)}
                  helperText={formik.touched.imageUrl && formik.errors.imageUrl}
                />
                <TextField
                  fullWidth
                  id="author"
                  name="author"
                  label="Author"
                  value={formik.values.author}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.author && Boolean(formik.errors.author)}
                  helperText={formik.touched.author && formik.errors.author}
                />
                <TextField
                  fullWidth
                  id="title"
                  name="title"
                  label="Title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title  && formik.errors.title}
                />
                <TextField
                  fullWidth
                  id="subtitle"
                  name="subtitle"
                  label="Subtitle"
                  value={formik.values.subtitle}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.subtitle && Boolean(formik.errors.subtitle)}
                  helperText={formik.touched.subtitle && formik.errors.subtitle}
                />
                <TextField
                  fullWidth
                  id="category"
                  name="category"
                  label="Category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.category && Boolean(formik.errors.category)}
                  helperText={formik.touched.category && formik.errors.category}
                />
                <CssVarsProvider>
                  <Textarea
                    id="content"
                    name="content"
                    minRows={1}
                    size="lg"
                    variant="outlined"
                    value={formik.values.content}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.content && Boolean(formik.errors.content)}
                    placeholder="Short content description"
                    endDecorator={
                      <Box className={styles.charCounter}>
                        <p>
                          {formik.values.content.length} / 30
                        </p>
                      </Box>
                    }
                  />
                </CssVarsProvider>
                <CssVarsProvider>
                  <Textarea
                    id="description"
                    name="description"
                    minRows={3}
                    size="lg"
                    variant="outlined"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    placeholder="Description"
                    endDecorator={
                      <Box className={styles.charCounter}>
                        <p>
                          {formik.values.description.length} / 100
                        </p>
                      </Box>
                    }
                  />
                </CssVarsProvider>
              </Box>
              <Box className={`${styles.buttonContainer} ${styles.basicYPadding}`}>
                <Button color="inherit" variant="text" type="reset">
                  Cancel
                </Button>
                <Button color="primary" variant="contained" type="submit">
                  Add new articless
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </DrawerMUI >
  )
}

export default Drawer