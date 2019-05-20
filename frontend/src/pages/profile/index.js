/* eslint-disable max-len */
import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ThemesActions from '../../store/ducks/themes';
import ProfileActions from '../../store/ducks/profile';

import Loading from '../../styles/components/Loading';
import Form from '../../styles/components/Form';
import Button from '../../styles/components/Button';
import Themes from '../../styles/components/Themes';
import Input from '../../styles/components/Input';
import { Container, PreferencesIntro } from './styles';

import Navbar from '../../components/Navbar';

class Profile extends Component {
  static propTypes = {
    loadThemesRequest: PropTypes.func.isRequired,
    loadProfileRequest: PropTypes.func.isRequired,
    updateProfileRequest: PropTypes.func.isRequired,
    profile: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      email: PropTypes.string,
      preferences: PropTypes.instanceOf(PropTypes.array),
    }).isRequired,
    themes: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
    }).isRequired,
    loading: PropTypes.bool.isRequired,
  };

  state = {
    name: '',
    password: '',
    passwordConfirmation: '',
    preferencesId: [],
    firstSignin: false,
  };

  componentDidMount() {
    const { loadThemesRequest, loadProfileRequest } = this.props;

    loadThemesRequest();
    loadProfileRequest();

    this.setState({ firstSignin: !!localStorage.getItem('@meetapp:first_signin') });
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading) {
      const { profile } = nextProps;
      if (profile.data) {
        const { name, preferences } = profile.data;
        const preferencesId = preferences && preferences.map(preference => preference.id);
        this.setState({ name, preferencesId });
      }
    }
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCheckboxChange = (event) => {
    const preferenceId = parseInt(event.target.value, 10);
    const isChecked = event.target.checked;
    const { preferencesId } = this.state;

    if (isChecked) {
      this.setState({ preferencesId: [...preferencesId, preferenceId] });
    } else {
      this.setState({
        preferencesId: preferencesId.filter(preference => preference !== preferenceId),
      });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { updateProfileRequest } = this.props;
    const {
      name, password, passwordConfirmation, preferencesId, firstSignin,
    } = this.state;

    if (password && password !== passwordConfirmation) {
      toastr.warning('Atenção', 'Confirme sua senha');
      return;
    }

    if (preferencesId.length === 0) {
      toastr.warning(
        'Atenção',
        firstSignin ? 'Escolha uma preferência' : 'Escolha um tema de meetup',
      );
      return;
    }

    updateProfileRequest(name, password, passwordConfirmation, preferencesId);

    this.setState({ password: '', passwordConfirmation: '' });
  };

  render() {
    const { loading, themes } = this.props;
    const {
      name, password, passwordConfirmation, preferencesId, firstSignin,
    } = this.state;

    return (
      <Fragment>
        <Navbar />
        <Container>
          {loading ? (
            <Loading>Carregando...</Loading>
          ) : (
            <Form onSubmit={this.handleSubmit}>
              {!firstSignin && (
                <>
                  <span>Nome</span>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Digite seu nome"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={this.handleInputChange}
                  />
                  <span>Senha</span>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Sua senha secreta"
                    autoComplete="new-password"
                    value={password}
                    onChange={this.handleInputChange}
                  />

                  <span>Confirmação de senha</span>
                  <Input
                    type="password"
                    name="passwordConfirmation"
                    placeholder="Sua senha secreta"
                    autoComplete="new-password-confirmation"
                    value={passwordConfirmation}
                    onChange={this.handleInputChange}
                  />
                  <span>Tema do meetup</span>
                </>
              )}

              {firstSignin && (
                <>
                  <PreferencesIntro>
                    <strong>{`Olá, ${name}`}</strong>
                    <br />
                    <br />
                    <p>
                      Parece que é seu primeiro acesso por aqui, comece escolhendo algumas
                      preferências para selecionarmos os melhores meetups pra você:
                    </p>
                  </PreferencesIntro>

                  <span>Preferências</span>
                </>
              )}

              <Themes>
                {themes.data.map(theme => (
                  <label key={theme.id}>
                    <Input
                      type="checkbox"
                      name="preferences[]"
                      checked={preferencesId && preferencesId.includes(theme.id)}
                      value={theme.id}
                      onChange={this.handleCheckboxChange}
                    />
                    <span>{theme.title}</span>
                  </label>
                ))}
              </Themes>

              <Button type="submit">{firstSignin ? 'Continuar' : 'Salvar'}</Button>
            </Form>
          )}
          <Link to="/logout">Sair</Link>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  themes: state.themes,
  profile: state.profile,
  loading: state.profile.loading,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    ...ProfileActions,
    ...ThemesActions,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
