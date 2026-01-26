import { FooterContactProps } from '@/interfaces';

const FooterContact = ({ title, contacts }: FooterContactProps) => {
  return (
    <div>
      <h2 className="text-(--text-third) font-bold text-2xl mb-4">{title}</h2>
      <div className="space-y-4">
        {contacts.map((contact, i) => {
          const { Icon, text } = contact;
          return (
            <div key={i} className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full p-2 bg-(--bg-slate-100) flex items-center justify-center">
                {Icon && <Icon size={20} className="text-(--bg-bold-blue)" />}
              </div>
              <p className="text-(--slate-700) text-base font-normal">{text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FooterContact;
