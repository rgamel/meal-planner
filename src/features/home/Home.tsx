import { AuthButton } from 'components/AuthButton';
import { PageTitle } from 'components/PageTitle';
import { Button } from 'components/Button';

export function Home() {
    return (
        <section className="pt-20 text-center">
            <PageTitle>Grocery Planner</PageTitle>
            <div className="m-8 rounded-lg bg-gray-200 p-20">
                <AuthButton />
                <Button>Text Button!</Button>
                <Button variant="text" disabled>
                    Disabled Text Button!
                </Button>
                <Button variant="contained">Contained Button!</Button>
                <Button variant="contained" disabled>
                    Disabled Contained Button!
                </Button>
                <Button variant="outlined">Outlined Button!</Button>
                <Button variant="outlined" disabled>
                    Disabled Outlined Button!
                </Button>
            </div>
        </section>
    );
}
