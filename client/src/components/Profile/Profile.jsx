import React from 'react';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Typography,
  Select,
  message,
  Row,
  Spin,
} from 'antd';
import { useAuthContext } from '../../context/AuthContext';
import { API } from '../../constant';
import { useState } from 'react';
import { getToken } from '../../helpers';
import './Profile.scss';

const { Title } = Typography;
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

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const { user, isLoading, setUser } = useAuthContext();

  const [cities, setCities] = useState(cityData[provinceData[0]]);
  const [secondCity, setSecondCity] = useState(cityData[provinceData[0]][0]);

  const handleProvinceChange = (value) => {
    setCities(cityData[value]);
    setSecondCity(cityData[value][0]);
  };

  const onSecondCityChange = (value) => {
    setSecondCity(value);
  };

  const handleProfileUpdate = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(`${API}/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // set the auth token to the user's jwt
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();

      setUser(responseData);
      message.success('Data saved successfully!');
    } catch (error) {
      console.error(Error);
      message.error('Error While Updating the Profile!');
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <Spin size="large" />;
  }

  return (
    <Card className="profile_page_card">
      <Row>
        <Title>Edit your profile</Title>
      </Row>
      <Form
        layout="vertical"
        initialValues={{
          username: user?.username,
          email: user?.email,
          Phone: user?.Phone,
          Additional_phone: user?.Additional_phone,
          Adresse: user?.Adresse,
          Region: user?.Region,
          Name: user?.Name,
          City: user?.City,
          last_name: user?.last_name,
        }}
        onFinish={handleProfileUpdate}
      >
        <Row>
          <Col>
          <Title level={4}>Personal informations</Title>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  message: 'Username is required!',
                  type: 'string',
                },
              ]}
            >
              <Input placeholder="Username" disabled />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  message: 'Email is required!',
                  type: 'email',
                },
              ]}
            >
              <Input placeholder="Email" disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Item
              label="Name"
              name="Name"
              rules={[
                {
                  required: true,
                  message: 'Name is required!',
                  type: 'string',
                },
              ]}
            >
              <Input placeholder="Name" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              label="last name"
              name="last_name"
              rules={[
                {
                  required: true,
                  type: 'string',
                  message: 'Last name is required!',
                },
              ]}
            >
              <Input placeholder="last_name" rows={6} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Title level={4}>Delivery information</Title>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Item
              label="Phone number"
              name="Phone"
              rules={[
                {
                  required: true,
                  message: 'Phone number required!',
                  type: 'string',
                },
              ]}
            >
              <Input placeholder="Phone" maxLength={8} prefix="+216" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              label="Additional phone"
              name="Additional_phone"
              rules={[
                {
                  type: 'string',
                },
              ]}
            >
              <Input
                placeholder="Additional_phone"
                maxLength={8}
                prefix="+216"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
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
                initialvalues={provinceData[0]}
                onChange={handleProvinceChange}
                options={provinceData.map((province) => ({
                  label: province,
                  value: province,
                }))}
              />
            </Form.Item>
          </Col>
          <Col>
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
                value={secondCity}
                onChange={onSecondCityChange}
                options={cities.map((city) => ({ label: city, value: city }))}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Item
            className='adresse'
              label="Adresse"
              name="Adresse"
              rules={[
                {
                  required: true,
                  message: 'Adresse is required!',
                  type: 'string',
                },
              ]}
            >
              <Input placeholder="Adresse" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
        <Col>
        <Button
          className="profile_save_btn"
          htmlType="submit"
          type="string"
          size="large"
        >
          {loading ? (
            <>
              <Spin size="small" /> Saving
            </>
          ) : (
            'Save'
          )}
        </Button>
        </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default Profile;
