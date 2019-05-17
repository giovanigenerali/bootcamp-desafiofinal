import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdCameraAlt, MdRemoveCircle } from 'react-icons/md';
import ThemesActions from '../../../store/ducks/themes';

import Form from '../../../styles/components/Form';
import Input from '../../../styles/components/Input';
import Button from '../../../styles/components/Button';
import Themes from '../../../styles/components/Themes';
import FileUpload from '../../../styles/components/FileUpload';
import { Container } from './styles';

import Navbar from '../../../components/Navbar';

class NewMeetup extends Component {
  static propTypes = {
    loadThemesRequest: PropTypes.func.isRequired,
    themes: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
    }).isRequired,
  };

  state = {
    imagePreview: null,
    fileName: null,
    fileKey: Date.now(),
  };

  componentDidMount() {
    const { loadThemesRequest } = this.props;

    loadThemesRequest();
  }

  handleFileUpload = (event) => {
    const file = event.target.files[0];
    const mimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];

    if (!file) {
      return;
    }

    if (mimeTypes.indexOf(file.type) === -1) {
      toastr.error('Atenção', 'O tipo de arquivo não é permitido.');
      this.handleFileCleanup();
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toastr.error('Atenção', 'O tamanho da imagem é maior que 2mb.');
      this.handleFileCleanup();
      return;
    }

    this.setState({ fileName: file.name });
    const previewImageUrl = URL.createObjectURL(file);
    this.setState({ imagePreview: previewImageUrl });
  };

  handleFileCleanup = () => {
    this.setState({ imagePreview: null, fileName: null, fileKey: Date.now() });
  };

  render() {
    const { fileName, imagePreview, fileKey } = this.state;
    const { themes } = this.props;

    return (
      <Fragment>
        <Navbar />
        <Container>
          <Form>
            <span>Título</span>
            <Input type="text" name="title" placeholder="Digite o título do meetup" required />

            <span>Descrição</span>
            <Input type="text" name="description" placeholder="Descreva seu meetup" required />

            <span>Data/hora</span>
            <Input type="datetime-local" name="when" required />

            <span>Imagem</span>
            <FileUpload>
              <div className="fileWrapper">
                {!imagePreview && <MdCameraAlt size={24} />}
                <Input
                  type="file"
                  name="image"
                  accept="image/png, image/jpeg, image/jpg"
                  key={fileKey}
                  onChange={event => this.handleFileUpload(event)}
                />
                {imagePreview && (
                  <img src={imagePreview} className="imagePreview" alt="Imagem do meetup" />
                )}
              </div>
              {imagePreview && (
                <div className="fileCleanup">
                  <span>{fileName}</span>
                  <button type="button" onClick={this.handleFileCleanup}>
                    <MdRemoveCircle size={16} />
                  </button>
                </div>
              )}
            </FileUpload>

            <span>Localização</span>
            <Input type="text" name="where" placeholder="Onde seu meetup irá acontecer?" required />

            <span>Tema do meetup</span>

            <Themes>
              {themes.data.map(theme => (
                <label key={theme.id}>
                  <Input type="checkbox" name="themes_id[]" value={theme.id} />
                  <span>{theme.title}</span>
                </label>
              ))}
            </Themes>

            <Button type="submit">Salvar</Button>
          </Form>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  themes: state.themes,
});

const mapDispatchToProps = dispatch => bindActionCreators(ThemesActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewMeetup);
