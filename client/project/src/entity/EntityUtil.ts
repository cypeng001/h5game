class EntityUtil {
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

        return "standfront";
    }
}