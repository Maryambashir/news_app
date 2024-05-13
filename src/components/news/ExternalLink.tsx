import OpenInNewIcon from '@mui/icons-material/OpenInNew';
type ExternalLinkProps = {
    URL: string
}
const ExternalLink = ({ URL }: ExternalLinkProps) => (
  <a href={URL} target="_blank" rel="noopener noreferrer">
     <OpenInNewIcon fontSize="small" />
  </a>
);

export default ExternalLink;
