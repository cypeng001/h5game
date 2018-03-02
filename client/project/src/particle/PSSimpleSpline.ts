class PSSimpleSpline {
    
    private _autoCalc: boolean = true;

    private _points: PSVec3[] = [];
    private _tangents: PSVec3[] = [];

    private _coeffs: PSMatrix4 = [2, -2, 1, 1,
        -3, 3, -2, -1,
        0, 0, 1, 0,
        1, 0, 0, 0];

    public addPoint(p: PSVec3): void {
        this._points.push(p);

        if(this._autoCalc) {
            this.recalcTangents();
        }
    }

    public getNumPoints(): number {
        return this._points.length;
    }

    private recalcTangents(): void {
        var i = 0;
        var isClosed: boolean = false;

        var numPoints = this._points.length;
        if (numPoints < 2) {
            return;
        }

        if (PSVec3Util.equal(this._points[0], this._points[numPoints-1])) {
            isClosed = true;
        }
        else {
            isClosed = false;
        }

        for(i = 0; i < numPoints; ++i) {
            if(!this._tangents[i]) {
                this._tangents.push([0, 0, 0]);
            }
            if (i ==0) {
                if (isClosed) {
                    PSVec3Util.sub(this._points[1], this._points[numPoints-2], this._tangents[i]);
                    PSVec3Util.multiply(this._tangents[i], 0.5, this._tangents[i]);
                }
                else {
                    PSVec3Util.sub(this._points[1], this._points[0], this._tangents[i]);
                    PSVec3Util.multiply(this._tangents[i], 0.5, this._tangents[i]);
                }
            }
            else if (i == numPoints-1) {
                if (isClosed) {
                    PSVec3Util.copy(this._tangents[0], this._tangents[i]);
                }
                else {
                    PSVec3Util.sub(this._points[i], this._points[i-1], this._tangents[i]);
                    PSVec3Util.multiply(this._tangents[i], 0.5, this._tangents[i]);
                }
            }
            else {
                PSVec3Util.sub(this._points[i + 1], this._points[i - 1], this._tangents[i]);
                PSVec3Util.multiply(this._tangents[i], 0.5, this._tangents[i]);
            }
        }
    }

    public interpolate(t: number, result: PSVec3): void {
        var fSeg = t * (this._points.length - 1);
        var segIdx = Math.floor(fSeg);
        t = fSeg - segIdx;

        return this._interpolate(segIdx, t, result);
    }

    private _interpolate(fromIndex: number, t: number, result: PSVec3): void {
        if ((fromIndex + 1) == this._points.length) {
            PSVec3Util.copy(this._points[fromIndex], result);
        }

        if (t == 0) {
            PSVec3Util.copy(this._points[fromIndex], result);
        }
        else if(t == 1) {
            PSVec3Util.copy(this._points[fromIndex + 1], result);
        }

        var t2, t3;
        t2 = t * t;
        t3 = t2 * t;

        var powersTmp = PSVec4Ftry.getInstance().create(t3, t2, t, 1);

        var point1 = this._points[fromIndex];
        var point2 = this._points[fromIndex+1];
        var tan1 = this._tangents[fromIndex];
        var tan2 = this._tangents[fromIndex+1];

        var mtxTmp: PSMatrix4 = PSMatrix4Ftry.getInstance().create();

        mtxTmp[0] = point1[0];
        mtxTmp[1] = point1[1];
        mtxTmp[2] = point1[2];
        mtxTmp[3] = 1;
        mtxTmp[4] = point2[0];
        mtxTmp[5] = point2[1];
        mtxTmp[6] = point2[2];
        mtxTmp[7] = 1;
        mtxTmp[8] = tan1[0];
        mtxTmp[9] = tan1[1];
        mtxTmp[10] = tan1[2];
        mtxTmp[11] = 1;
        mtxTmp[12] = tan2[0];
        mtxTmp[13] = tan2[1];
        mtxTmp[14] = tan2[2];
        mtxTmp[15] = 1;

        var retTmp: PSVec4 = PSVec4Ftry.getInstance().create(0, 0, 0, 0);

        PSMatrix4Util.transformVec4(this._coeffs, powersTmp, retTmp);
        PSMatrix4Util.transformVec4(mtxTmp, retTmp, powersTmp);

        PSVec3Util.set(result, powersTmp[0], powersTmp[1], powersTmp[2]);

        PSVec4Ftry.getInstance().release(retTmp);
        PSVec4Ftry.getInstance().release(powersTmp);
        PSMatrix4Ftry.getInstance().release(mtxTmp);
    }

    
}