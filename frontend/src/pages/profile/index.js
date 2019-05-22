/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ThemesActions from '../../store/ducks/themes';
import ProfileActions from '../../store/ducks/profile';

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
    firstLogin: false,
  };

  componentDidMount() {
    const { loadThemesRequest, loadProfileRequest } = this.props;

    loadThemesRequest();
    loadProfileRequest();

    this.setState({ firstLogin: !!localStorage.getItem('@meetapp:first_login') });
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
      name, password, passwordConfirmation, preferencesId,
    } = this.state;

    if (password && password !== passwordConfirmation) {
      toastr.warning('Atenção', 'Confirme sua senha');
      return;
    }

    if (preferencesId.length === 0) {
      toastr.warning('Atenção', 'Escolha uma preferência');
      return;
    }

    updateProfileRequest(name, password, passwordConfirmation, preferencesId);

    this.setState({ password: '', passwordConfirmation: '' });
  };

  render() {
    const { loading, themes } = this.props;
    const {
      name, password, passwordConfirmation, preferencesId, firstLogin,
    } = this.state;

    return (
      <>
        <Navbar />
        <Container>
          {!loading && (
            <>
              <Form onSubmit={this.handleSubmit}>
                {!firstLogin && (
                  <>
                    <label htmlFor="name">Nome</label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Digite seu nome"
                      autoComplete="name"
                      required
                      value={name}
                      onChange={this.handleInputChange}
                    />

                    <label htmlFor="password">Senha</label>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Sua senha secreta"
                      autoComplete="new-password"
                      value={password}
                      onChange={this.handleInputChange}
                    />

                    <label htmlFor="passwordConfirmation">Confirmação de senha</label>
                    <Input
                      type="password"
                      name="passwordConfirmation"
                      id="passwordConfirmation"
                      placeholder="Sua senha secreta"
                      autoComplete="new-password-confirmation"
                      value={passwordConfirmation}
                      onChange={this.handleInputChange}
                    />
                  </>
                )}

                {firstLogin && (
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
                  </>
                )}

                <label htmlFor="preferences[]">Preferências</label>
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

                <Button type="submit">{firstLogin ? 'Continuar' : 'Salvar'}</Button>
              </Form>

              <Link to="/logout">Sair</Link>
            </>
          )}
        </Container>
      </>
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
