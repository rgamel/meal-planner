import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Icon from '@mui/material/Icon';

export function StoreListAccordion({
    label,
    count,
    children,
}: {
    label?: string;
    count?: number;
    children: JSX.Element | JSX.Element[];
}) {
    const summaryText = (label ?? '') + (count ? `: ${count}` : '');
    return (
        <div className="w-full">
            <Accordion>
                <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
                    <p className="text-base font-normal text-black">{summaryText}</p>
                </AccordionSummary>
                <AccordionDetails>{children}</AccordionDetails>
            </Accordion>
        </div>
    );
}
