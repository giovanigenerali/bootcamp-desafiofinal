import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';
import moment from 'moment';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdCameraAlt, MdRemoveCircle } from 'react-icons/md';
import ThemesActions from '../../../store/ducks/themes';
import MeetupsActions from '../../../store/ducks/meetups';

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
    meetupNewRequest: PropTypes.func.isRequired,
    themes: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
    }).isRequired,
  };

  state = {
    title: '',
    description: '',
    when: '',
    where: '',
    themesId: [],
    imagePreview: null,
    file: null,
    fileKey: Date.now(),
  };

  componentDidMount() {
    const { loadThemesRequest } = this.props;

    loadThemesRequest();
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCheckboxChange = (event) => {
    const themeId = event.target.value;
    const isChecked = event.target.checked;
    const { themesId } = this.state;

    if (isChecked) {
      this.setState({ themesId: [...themesId, themeId] });
    } else {
      this.setState({ themesId: themesId.filter(theme => theme !== themeId) });
    }
  };

  handleFileUpload = (event) => {
    const file = event.target.files[0];
    const mimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];

    if (!file) {
      return;
    }
    if (event.target.value.length === 0) {
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

    this.setState({ file });

    const previewImageUrl = URL.createObjectURL(file);

    this.setState({ imagePreview: previewImageUrl });
  };

  handleFileCleanup = () => {
    this.setState({ imagePreview: null, file: null, fileKey: Date.now() });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      title, description, where, when, themesId, file,
    } = this.state;
    const { meetupNewRequest } = this.props;

    if (!file) {
      toastr.warning('Atenção', 'Escolha uma imagem para o meetup');
      return;
    }

    if (themesId.length === 0) {
      toastr.warning('Atenção', 'Escolha um tema para o meetup');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('where', where);
    formData.append('when', moment(when).format('YYYY-MM-DD HH:mm:ss'));
    formData.append('image', file);
    themesId.map(theme => formData.append('themes_id[]', theme));

    meetupNewRequest(formData);
  };

  render() {
    const {
      title, description, when, where, themesId, file, imagePreview, fileKey,
    } = this.state;

    const { themes } = this.props;

    return (
      <Fragment>
        <Navbar />
        <Container>
          <Form onSubmit={this.handleSubmit}>
            <span>Título</span>
            <Input
              type="text"
              name="title"
              placeholder="Digite o título do meetup"
              value={title}
              required
              onChange={this.handleInputChange}
            />

            <span>Descrição</span>
            <Input
              type="text"
              name="description"
              placeholder="Descreva seu meetup"
              value={description}
              required
              onChange={this.handleInputChange}
            />

            <span>Data/hora</span>
            <Input
              type="datetime-local"
              name="when"
              value={when}
              required
              onChange={this.handleInputChange}
            />

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
                  <span>{file.name}</span>
                  <button type="button" onClick={this.handleFileCleanup}>
                    <MdRemoveCircle size={16} />
                  </button>
                </div>
              )}
            </FileUpload>

            <span>Localização</span>
            <Input
              type="text"
              name="where"
              placeholder="Onde seu meetup irá acontecer?"
              value={where}
              required
              onChange={this.handleInputChange}
            />

            <span>Tema do meetup</span>

            <Themes>
              {themes.data.map(theme => (
                <label key={theme.id}>
                  <Input
                    type="checkbox"
                    name="themes_id[]"
                    value={theme.id}
                    checked={themesId.includes(String(theme.id))}
                    onChange={this.handleCheckboxChange}
                  />
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

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    ...MeetupsActions,
    ...ThemesActions,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewMeetup);
