// component
import Iconify from '../../../components/iconify';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

// const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;
const icon = (icon) => <Iconify icon={icon} width={24} height={24} />;
const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('carbon:dashboard'),
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: icon('simple-icons:blogger'),
  },
  // {
  //   title: 'pages',
  //   path: '/dashboard/pages',
  //   icon: icon('ooui:special-pages-ltr'),
  // },
  {
    title: 'ebook',
    path: '/dashboard/ebook',
    icon: icon('mdi:notebook-check'),
  },
  {
    title: 'checklist',
    path: '/dashboard/checklist',
    icon: icon('material-symbols:checklist'),
  },
  {
    title: 'infographics',
    path: '/dashboard/infographics',
    icon: icon('fluent:diagram-24-regular'),
  },
  {
    title: 'Casestudies',
    path: '/dashboard/casestudies',
    icon: icon('fluent-mdl2:test-case'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('mdi:users-group'),
  },
];

export default navConfig;
