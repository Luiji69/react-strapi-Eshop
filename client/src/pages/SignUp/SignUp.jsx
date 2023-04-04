import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Select,
  Input,
  message,
  Row,
  Spin,
  Typography,
} from 'antd';
import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import useScreenSize from '../../components//hooks/useScreenSize';
import { API } from '../../constant';
import { setToken } from '../../helpers';
import './SignUp.scss'
const provinceData = [
  'Ariana',
  'Béja',
  'Ben_arous',
  'Bizert',
  'Gabes',
  'Gafsa',
  'Jandouba',
  'Kairaoun',
  'Kassrine',
  'Kebili',
  'Manouba',
  'Elkef',
  'Mahdia',
  'Mednine',
  'Monastir',
  'Nabeul',
  'Sfax',
  'Sidi_Bouzid',
  'Seliana',
  'Sousse',
  'Tatouine',
  'Tozeur',
  'Tunis',
  'Zaghouan',
];

const cityData = {
  Ariana: [
    'Ariana Ville',
    'Borj El Baccouch',
    'Borj Louzir',
    'Borj Touil',
    'Cebelet Ben Ammar',
    'Charguia II',
    'Cité El Ghazala',
    'Ennaser 1',
    'Ennaser 2',
    'Ettadhamen',
    'Kalaat Landlous',
    'La Soukra',
    'Menzah 1',
    'Menzah 5',
    'Menzah 6',
    'Menzah 7',
    'Menzah 8',
    'Mnihla',
    'Raoued',
    'Riadh El Andalous',
    'Sidi Thabet',
  ],
  Béja: [
    'Amdoun',
    'Beja Nord',
    'Beja Sud',
    'Goubellat',
    'Mjez El Bab',
    'Nefza',
    'Teboursouk',
    'Testour',
    'Thibar',
  ],
  Ben_arous: [
    'Ben Arous',
    'Bir El Bey',
    'Bir El Kassaa',
    'Borj Cedria',
    'Boumhal El Basetine',
    'Boukornine',
    'El Mourouj',
    'El Yasminette',
    'Ezzahra',
    'Fouchana',
    'Hammam Chatt',
    'Hammam Lif',
    'Khelidia',
    'Megrine',
    'Mohamadia',
    'Mornag',
    'Mourouj 1',
    'Mourouj 3',
    'Mourouj 4',
    'Mourouj 5',
    'Mourouj 6',
    'Naassen',
    'Nouvelle Medina',
    'Rades',
  ],
  Bizert: [
    'Bizert Nord',
    'Bizert Sud',
    'El Alia',
    'Ghar El Mellh',
    'Ghezala',
    'Joumine',
    'Mateur',
    'Menzel Bourguiba',
    'Menzel Jemil',
    'Ras Jebel',
    'Sejnane',
    'Tinja',
    'Utique',
    'Zarzouna',
  ],
  Gabes: [
    'El Hamma',
    'El Metouia',
    'Gabes Medina ',
    'Gabes Ouest',
    'Gabes Sud',
    'Ghannouche',
    'Mareth',
    'Matmata',
    'Menzel Habib',
    'Nouvelle Matmata',
  ],
  Gafsa: [
    'Belkhir',
    'El Guettar',
    'el Ksar',
    'El Mdhilla',
    'Gafsa Nord',
    'Gafsa Sud',
    'Metlaoui',
    'Moulares',
    'Redeyef',
    'Sidi Aich',
    'Sned',
  ],
  Jandouba: [
    'Ain Drahem',
    'Balta Bou Aouene',
    'Bou Salem',
    'Fernana',
    'Gharimaou',
    'Jendouba',
    'Jendouba Nord',
    'Oued Mliz',
    'Tabarka',
  ],
  Kairaoun: [
    'Bou Hajla',
    'Chebika',
    'Cherarda',
    'El Ala',
    'Haffouz',
    'Hajeb El Ayoun',
    'Kairaouen Nord',
    'Kairaouen Sud',
    'Nasrallah',
    'Oueslatia',
    'Sbikha',
  ],
  Kassrine: [
    'El Zouhour',
    'El Ayoun',
    'Feriana',
    'Foussana',
    'Haidra',
    'Jediliane',
    'Kasserine Nord',
    'Kasserine Sud',
    'Mejel Bel Abbes',
    'Sbitla',
    'Sbiba',
    'Thala',
  ],
  Kebili: ['Douz', 'El Faouar', 'Kebili Nord', 'Kebili Sud', 'Souk El Ahed'],
  Manouba: [
    'Borj El Amri',
    'Borj Etoumi',
    'Chabbaou',
    'Chaouat',
    'Complexe Universitaire',
    'Denden',
    'Douar Hicher',
    'Eddkhila',
    'El Battan',
    'El Fejja',
    'Mannouba',
    'Mornaguia',
    'Oued Elil',
    'Tebourba',
    'Jedaida',
  ],
  Elkef: [
    'Dahmani',
    'El Ksour',
    'Jerissa',
    'Kalaa El Khasba',
    'Kalaat Sinane',
    'Le Kef Est',
    'Le Kef Ouest',
    'Le Sers',
    'Nebeur',
    'Sakiat Sidi Youssef',
    'Tajerouine',
    'Touiref',
  ],
  Mahdia: [
    'Bou Merdes',
    'Chorbane',
    'El Jem',
    'Hbira',
    'Ksour Essaf',
    'Le Chebba',
    'Mahdia',
    'Melloulech',
    'Oued Chamakh',
    'Sidi Alouene',
    'Souassi',
  ],
  Mednine: [
    'Ajim',
    'Ben Guerdane',
    'Beni Khedache',
    'Houmet Essouk',
    'Medenine Nord',
    'Medenine Sud',
    'Midoun',
    'Sidi Makhlouf',
    'Zarzis',
  ],
  Monastir: [
    'Bekalta',
    'Bembla',
    'Beni Hassen',
    'Jemmal',
    'Ksar Helal',
    'Ksibet El Mediouni',
    'Moknine',
    'Monastir',
    'Ouerdanine',
    'Sahline',
    'Sayda Lamta Bou Hjar',
    'Teboulba',
    'Zeramdine',
  ],
  Nabeul: [
    'Beni Khalled',
    'Beni Khiar',
    'Bou argoub',
    'Dar Chaabane Elfehri',
    'El Haouria',
    'El Mida',
    'Grombalia',
    'Hammem El Ghezaz',
    'Hammamet',
    'Kelibia',
    'Korba',
    'Menzel Bouzelfa',
    'Menzel Temime',
    'Nabeul',
    'Soliman',
    'Takelsa',
  ],
  Sfax: [
    'Agareb',
    'Bir Ali Ben Khalifa',
    'El Amra',
    'El Hancha',
    'Esskhira',
    'Ghraiba',
    'Jebeniana',
    'Kerkenah',
    'Mahres',
    'Menzel Chaker',
    'Sakiat Eddaier',
    'Sakiat Ezzit',
    'Sfax Est',
    'Sfax Sud',
    'Sfax Ville',
  ],
  Sidi_Bouzid: [
    'Ben Oun',
    'Bir El Haffey',
    'Cebbala',
    'Jilma',
    'Maknassy',
    'Menzel Bouzaiene',
    'Mezzouna',
    'Ouled Haffouz',
    'Regueb',
    'Sidi Bouzid Est',
    'Sidi Bouzid Ouest',
    'Souk Jedid',
  ],
  Seliana: [
    'Bargou',
    'Bou Arada',
    'El Aroussa',
    'Gaafour',
    'Kesra',
    'Le Krib',
    'Mokhtar',
    'Rohia',
    'Sidi Bou Rouis',
    'Siliana Nord',
    'Siliana Sud',
  ],
  Sousse: [
    'Akouda',
    'Bou Ficha',
    'Enfidha',
    'Hamma Sousse',
    'Hergla',
    'Kalaa El Kebira',
    'Kalaa El Sghira',
    'Kondar',
    'Msaken',
    'Sidi Bou Ali',
    'Sidi El Heni',
    'Sousse Jaouhara',
    'Sousse Riadh',
    'Sousse Ville',
  ],
  Tatouine: [
    'Bir Lahmar',
    'Dehiba',
    'Ghomrassen',
    'Remada',
    'Smar',
    'Tataouine Nord',
    'Tataouine Sud',
  ],
  Tozeur: ['Degueche', 'Hezoua', 'Nefta', 'Tamaghza', 'Tozeur'],
  Tunis: [
    'Bab Bhar',
    'Bab Bnet',
    'Bab El Falla',
    'Bab El Khadhra',
    'Bab Mnara',
    'Bab Saadoun',
    'Bab Jedid',
    'Bab Souika',
    'Belvedere',
    'Carthage',
    'Cité El Khadra',
    'Cité El Mahrajen',
    'Cité Hlel',
    'Cité Ibn Khaldoun',
    'Cité Ibn Sina',
    'Cité Intilaka',
    'Cité Rommana',
    'El Agba',
    'El Aouina',
    'El Hrairia',
    'El Kabaria',
    'El Kram',
    'El Manzah',
    'El Omrane',
    'El Omrane Superieur',
    'El Ouerdia',
    'Essijoumi',
    'Ettahrir',
    'Ezzouhour',
    'Gammart',
    'Hafsia',
    'Jardins De Carthage',
    'Jebal Jelloud',
    'La Goulette',
    'La Mars',
    'La Medina',
    'Le Bardo',
    'Les Berges Du Lac 1',
    'Les Berges Du Lac 2',
    'Manar 1',
    'Manar 2',
    'Manar 3',
    'Menzah 4',
    ' Menzah 9',
    'Montplaisir',
    'mourouj 2',
    'Sidi Bou Said',
    'Sidi El Bechir',
    'Sidi Hassine',
  ],
  Zaghouan: [
    'Bir Mcherga',
    'El Fahs',
    'Ennadhour',
    'Hammam Zriba',
    'Saouef',
    'Zaghouan',
  ],
};

const SignUp = () => {
  const { isDesktopView } = useScreenSize();
  const navigate = useNavigate();
  const [cities, setCities] = useState(cityData[provinceData[0]]);
  const [secondCity, setSecondCity] = useState(cityData[provinceData[0]][0]);
  const handleProvinceChange = (value) => {
    setCities(cityData[value]);
    setSecondCity(cityData[value][0]);
  };
  const onSecondCityChange = (value) => {
    setSecondCity(value);
  };

  const { setUser } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState('');

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/auth/local/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (data?.error) {
        throw data?.error;
      } else {
        // set the token
        setToken(data.jwt);

        // set the user
        setUser(data.user);

        message.success(`Welcome to Social Cards ${data.user.username}!`);

        navigate('/profile', { replace: true });
      }
    } catch (error) {
      console.error(error);
      setError(error?.message ?? 'Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <Row align="middle">
        <Col span={isDesktopView ? 8 : 24} offset={isDesktopView ? 8 : 0}>
          <Card title="SignUp">
            {error ? (
              <Alert
                className="alert_error"
                message={error}
                type="error"
                closable
                afterClose={() => setError('')}
              />
            ) : null}
            <Form
              name="basic"
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    type: 'string',
                  },
                ]}
              >
                <Input placeholder="Username" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    type: 'email',
                  },
                ]}
              >
                <Input placeholder="Email address" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true }]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>

              <Form.Item
                label="Name"
                name="Name"
                rules={[
                  {
                    required: true,
                    type: 'string',
                  },
                ]}
              >
                <Input placeholder="Name" />
              </Form.Item>

              <Form.Item
                label="Last name"
                name="last_name"
                rules={[{ required: true }]}
              >
                <Input placeholder="Last name" />
              </Form.Item>

              <Form.Item
                label="Phone"
                name="Phone"
                rules={[{ required: true }]}
              >
                <Input placeholder="Your phone number" prefix="+216" />
              </Form.Item>

              <Form.Item
                label="Phone"
                name="Additional_phone"
              >
                <Input placeholder="Additional phone number" prefix="+216" />
              </Form.Item>
              
              <Form.Item
                label="Adresse"
                name="Adresse"
                rules={[{ required: true }]}
              >
                <Input placeholder="Your adresse" />
              </Form.Item>

              <Form.Item
                label="Region"
                name="Region"
                rules={[
                  {
                    required: true,
                    type: 'string',
                  },
                ]}
              >
                <Select
                  style={{ width: 420 }}
                  initialvalues={provinceData[0]}
                  onChange={handleProvinceChange}
                  options={provinceData.map((province) => ({
                    label: province,
                    value: province,
                  }))}
                />
              </Form.Item>

              <Form.Item
                label="City"
                name="City"
                rules={[
                  {
                    required: true,
                    type: 'string',
                  },
                ]}
              >
                <Select
                  style={{ width: 420 }}
                  value={secondCity}
                  onChange={onSecondCityChange}
                  options={cities.map((city) => ({ label: city, value: city }))}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  style={{ background: '#68944f' }}
                  type="primary"
                  htmlType="submit"
                  className="login_submit_btn"
                >
                  Submit {isLoading && <Spin size="small" />}
                </Button>
              </Form.Item>
            </Form>
            <Typography.Paragraph className="form_help_text">
              Already have an account? <Link to="/signin">Sign In</Link>
            </Typography.Paragraph>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default SignUp;
