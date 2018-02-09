namespace h5game
{

export class EntityUtil {
    public static actionState2Str(actionState: number): string {
        if(actionState == ActorActionState.AAS_STANDFRONT) {
            return "standfront";
        }
        else if(actionState == ActorActionState.AAS_STANDBACK) {
            return "standback";
        }
        else if(actionState == ActorActionState.AAS_RUNFRONT) {
            return "runfront";
        }
        else if(actionState == ActorActionState.AAS_RUNBACK) {
            return "runback";
        }
        else if(actionState == ActorActionState.AAS_ATTACKFRONT) {
            return "attackfront";
        }
        else if(actionState == ActorActionState.AAS_ATTACKBACK) {
            return "attackback";
        }

        return "standfront";
    }

    public static actStFrmRate(entityType: number, actionState: number): number {
        if(actionState == ActorActionState.AAS_STANDFRONT 
            || actionState == ActorActionState.AAS_STANDBACK
            || actionState == ActorActionState.AAS_RUNFRONT
            || actionState == ActorActionState.AAS_RUNBACK
            || actionState == ActorActionState.AAS_ATTACKFRONT
            || actionState == ActorActionState.AAS_ATTACKBACK
            ) {

            return 12;
        }

        return -1;
    }
}

}